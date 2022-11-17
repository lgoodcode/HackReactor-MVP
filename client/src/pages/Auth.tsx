import { useEffect, useState } from 'preact/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, type Validations } from '@/utils/useForm'
import { nameRegex, emailRegex, passwordRegex } from '@/utils/regex'
import bgImage from '@@/public/img/mountains.webp'
import SimpleLoader from '@/components/Loaders/Simple'
import Input from '@/components/Input'

type Data = Record<'firstName' | 'lastName' | 'email' | 'password', string>

const validations: Validations<Data> = {
  firstName: {
    required: 'Please enter your first name',
    pattern: {
      value: nameRegex,
      message: 'Please enter a valid first name',
    },
  },
  lastName: {
    required: 'Please enter your last name',
    pattern: {
      value: nameRegex,
      message: 'Please enter a valid last name',
    },
  },
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

export default function AuthPage() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [signup, setSignup] = useState(pathname.includes('register') ?? false)
  const [authenticating, setAuthenticating] = useState(false)
  const [serverError, setServerError] = useState('')
  const remembered = Boolean(localStorage.getItem('remember')) ?? false
  const rememberedEmail = localStorage.getItem('email') ?? ''
  const [remember, setRememeber] = useState(remembered)

  const handleToggle = (e: any) => setRememeber(e.target.checked)

  // Changes the form to register or login
  const changeAuth = () => {
    navigate(signup ? '/login' : '/signup', {
      replace: true,
    })
    setSignup(!signup)
  }

  const handleOAuth = (provider: string) => async () => {
    setAuthenticating(true)

    // const { error } = await loginWithProvider(provider)

    // if (error) {
    //   setAuthenticating(false)
    //   return setServerError(error)
    // }

    // const redirect = router.query.redirect as string
    // // Need to define shallow routing becase we don't want to trigger a full page reload
    // router.push(redirect || '/', undefined, { shallow: true })
  }

  // Handles the form submission
  const onSubmit = async (data: Data) => {
    // const { error } = await (register
    //   ? signUp(data.firstName, data.lastName, data.email, data.password)
    //   : login(data.email, data.password))

    // if (error) {
    //   setServerError(error || 'Something went wrong. Please refresh the page and try again.')
    //   return false
    // }

    // if (remembered) {
    //   localStorage.setItem('email', data.email)
    // } else {
    //   localStorage.removeItem('email')
    // }

    // // If registering, simply redirect to dashboard
    // if (register) {
    //   router.push('/')
    //   // Otherwise, redirect to the page the user was on before, if it exists
    // } else {
    //   const redirect = router.query.redirect as string
    //   router.push(redirect || '/')
    // }

    return true
  }

  // Hook to handle all the validation and form state
  const { submitting, submitted, errors, register, handleSubmit } = useForm<Data>({
    initialValues: {
      email: rememberedEmail,
    },
    // Only validate the email/password fields for login and the rest for register
    validations: signup
      ? validations
      : { email: validations.email, password: validations.password },
    onSubmit,
  })

  useEffect(() => {
    if (remember) {
      localStorage.setItem('remember', 'true')
    } else {
      localStorage.removeItem('remember')
    }
  }, [remember])

  return (
    <>
      <head>
        <title>{`${signup ? 'Register' : 'Login'} | MVP`}</title>
      </head>

      <div className="centered h-screen mx-4 sm:mx-0 sm:py-8 lg:my-0 lg:py-0">
        <div className="container max-w-sm sm:max-w-md my-8 lg:my-0">
          <div className="form-container relative w-full rounded-xl shadow-lg bg-blackAlpha-600">
            <div
              className={[
                'form-overlay',
                'absolute',
                'h-full',
                'centered',
                'inset-0',
                'rounded-xl',
                'z-10',
                'bg-gray-900',
                'opacity-75',
                authenticating || submitting || submitted ? '' : 'hidden',
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
                <a className="centered">
                  <img src="/vite.svg" alt="MVP logo" width={280} height={48} />
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
                {signup && (
                  <div className="input-group">
                    <Input name="firstName" label="First Name" {...register('firstName')} />
                    <Input
                      name="firstName"
                      // className="mt-3 sm:mt-5"
                      label="Last Name"
                      {...register('lastName')}
                    />
                  </div>
                )}
                {/* <Input
                  // className="mt-3 sm:mt-5"
                  label="Email"
                  type="email"
                  defaultValue={rememberedEmail}
                  {...register('email')}
                />
                <Input
                  label="Password"
                  type="password"
                  // className="mt-3 sm:mt-5"
                  {...register('password')}
                /> */}

                <div className="mt-6 sm:mt-8 flex justify-between">
                  <div className="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value={remembered ? 'true' : 'false'}
                      onChange={handleToggle}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-bottom mt-6 sm:mt-8 flex flex-col">
                <button type="submit" className="bg-arctic-500 hover:bg-arctic-600">
                  {authenticating ? <SimpleLoader /> : signup ? 'Sign up' : 'Log in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
