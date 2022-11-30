import { useState } from 'preact/hooks'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useForm, type Validations } from '@/hooks/useForm'
import { emailRegex, passwordRegex } from '@/utils/regex'
import SimpleLoader from '@/components/Loaders/Simple'
import Input from '@/components/Input'
import useMediaQuery from '@/hooks/useMediaQuery'
import apiFetcher from '@/utils/apiFetcher'

type Data = Record<'email' | 'password', string>

export type AuthProps = {
  setSession: (session: Session) => void
}

const validations: Validations<Data> = {
  email: {
    required: 'Please enter your email address',
    pattern: {
      value: emailRegex,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password must be at least 8 characters, contain a number, and a special character',
    pattern: {
      value: passwordRegex,
      message: 'Password must be at least 8 characters, contain a number, and a special character',
    },
  },
}

export default function AuthPage({ setSession }: AuthProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [signup, setSignup] = useState(pathname.includes('signup') ?? false)
  const [authenticating, setAuthenticating] = useState(false)
  const [serverError, setServerError] = useState('')
  const rememberedEmail = localStorage.getItem('email') ?? ''
  const [remember, setRememeber] = useState(Boolean(localStorage.getItem('email')) ?? false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const logoSize = isDesktop ? 172 : 124

  // Set the page title
  document.title = (signup ? 'Register' : 'Login') + ` | ${import.meta.env.VITE_APP_TITLE}`

  // Toggles the remember me checkbox
  const handleToggle = () => setRememeber((prev) => !prev)

  // Changes the form to register or login
  const changeAuth = () => {
    navigate(signup ? '/login' : '/signup')
    setSignup(!signup)
  }

  // Handles the form submission
  const onSubmit = async (data: Data) => {
    setAuthenticating(true)

    const endpoint = signup ? '/register' : '/login'
    const { data: user, error } = await apiFetcher(endpoint, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (error) {
      setServerError(error.message)
      setAuthenticating(false)
      return false
    }

    if (remember) {
      localStorage.setItem('email', data.email)
    } else {
      localStorage.removeItem('email')
    }

    navigate('/')
    setSession(user)
    return true
  }

  // Hook to handle all the validation and form state
  const { submitting, register, handleSubmit } = useForm<Data>({
    initialValues: {
      email: rememberedEmail,
    },
    // Only validate the email/password fields for login and the rest for register
    validations: signup
      ? validations
      : {
          email: validations.email,
          password: validations.password,
        },
    onSubmit,
  })

  return (
    <div className="centered min-h-screen px-6 sm:px-0 sm:py-8 lg:py-8 ">
      <div className="container max-w-sm sm:max-w-md my-8 lg:my-0">
        <div className="form-container relative w-full rounded-xl shadow-lg bg-purple-500">
          <div
            className={[
              'form-overlay',
              'absolute',
              'h-full',
              'inset-0',
              'rounded-xl',
              'z-20',
              'bg-gray-900',
              'opacity-75',
              authenticating || submitting ? 'centered' : 'hidden',
            ].join(' ')}
          >
            <SimpleLoader w={48} h={48} />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative w-full pt-6 pb-10 sn:pt-8 sm:pb-12 md:pt-12 md:pb-16 px-4 sm:px-10"
          >
            <div className="form-top">
              <Link to="/" className="centered cursor-pointer select-none">
                <img src="/menelaus.svg" alt="Menelaus logo" width={logoSize} height={logoSize} />
                {/* <h3 className="text-5xl ml-2 text-white font-mont">Menelaus</h3> */}
              </Link>

              <div className="mt-6 sm:mt-8 text-center">
                <span className="text-gray-50">
                  {signup ? 'Already have an account?' : "Don't have an account?"}
                </span>
                <button
                  className="link ml-2"
                  type="button"
                  onClick={changeAuth}
                  onKeyDown={changeAuth}
                >
                  {signup ? 'Sign in' : 'Sign up'}
                </button>
              </div>
            </div>

            <div className="form-input mt-8 sm:mt-10">
              {serverError && (
                <div className="mb-4 sm:mb-6 bg-red-500 py-4 rounded-md text-center">
                  <h3 className="text2xl px-12 text-white">{serverError}</h3>
                </div>
              )}
              <div className="inputs flex flex-col gap-2">
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  defaultValue={rememberedEmail}
                  {...register('email')}
                  size={isDesktop ? 'lg' : 'sm'}
                />
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  {...register('password')}
                  size={isDesktop ? 'lg' : 'sm'}
                />
              </div>

              <div className="mt-6 sm:mt-8 flex justify-between">
                <div className="flex items-center mb-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultChecked={remember}
                    onChange={handleToggle}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500  focus:ring-2"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-sm font-medium text-gray-90"
                  >
                    Remember me
                  </label>
                </div>

                <div>
                  <Link to="/forgot-password" className="link">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            <div className="form-bottom mt-4 flex flex-col">
              <button
                type="submit"
                className="btn rounded-md bg-lavender-400 hover:bg-lavender-500"
              >
                {signup ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
