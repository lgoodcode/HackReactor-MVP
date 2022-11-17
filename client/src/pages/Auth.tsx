import { useState, type StateUpdater } from 'preact/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, type Validations } from '@/utils/useForm'
import { emailRegex, passwordRegex } from '@/utils/regex'
import SimpleLoader from '@/components/Loaders/Simple'
import Input from '@/components/Input'

type Data = Record<'email' | 'password', string>

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

export type AuthPageProps = {
  api: string
  setSession: StateUpdater<Session>
}

export default function AuthPage({ api, setSession }: AuthPageProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [signup, setSignup] = useState(pathname.includes('signup') ?? false)
  const [authenticating, setAuthenticating] = useState(false)
  const [serverError, setServerError] = useState('')
  const rememberedEmail = localStorage.getItem('email') ?? ''
  const [remember, setRememeber] = useState(Boolean(localStorage.getItem('email')) ?? false)

  // Set the page title
  document.title = (signup ? 'Register' : 'Login') + ' | MVP'

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

    const endpoint = signup ? 'register' : 'login'
    const res = await fetch(`${api}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err)
        return err.message
      })

    if ('error' in res) {
      setServerError(res.error)
      setAuthenticating(false)
      return false
    }

    if (remember) {
      localStorage.setItem('email', data.email)
    } else {
      localStorage.removeItem('email')
    }

    // Set the session id and redirect to the home page
    setSession(res.session)
    navigate('/')
    return true
  }

  // Hook to handle all the validation and form state
  const { submitting, submitted, register, handleSubmit } = useForm<Data>({
    initialValues: {
      email: rememberedEmail,
    },
    // Only validate the email/password fields for login and the rest for register
    validations: signup
      ? validations
      : { email: validations.email, password: validations.password },
    onSubmit,
  })

  return (
    <div className="centered h-screen mx-4 sm:mx-0 sm:py-8 lg:my-0 lg:py-0">
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
              authenticating || submitting || submitted ? 'centered' : 'hidden',
            ].join(' ')}
          >
            <SimpleLoader />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative w-full py-10 sm:py-12 md:py-16 px-4 sm:px-10"
          >
            <div className="form-top">
              <a href="/" className="centered cursor-pointer">
                <img src="/vite.svg" alt="MVP logo" width={64} height={64} />
                <h3 className="text-5xl ml-2 text-white font-mont">MVP</h3>
              </a>

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
                />
                <Input name="password" label="Password" type="password" {...register('password')} />
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
                  <a href="/forgot-password" className="link">
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <div className="form-bottom mt-4 flex flex-col">
              <button
                type="submit"
                className="btn rounded-md bg-lavender-500 hover:bg-lavender-400"
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
