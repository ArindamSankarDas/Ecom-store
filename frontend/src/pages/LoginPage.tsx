import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Label } from "@components/ui/label";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <main className='flex-1 flex justify-center items-center py-10 px-3 md:py-20'>
      <Card className='w-full max-w-md shadow'>
        <CardHeader>
          <CardTitle className='text-2xl text-center font-bold'>
            Login to Your Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className='space-y-5'>
            <div className='space-y-2'>
              <Label htmlFor='email' className='font-semibold text-base'>
                Email:
              </Label>
              <Input
                id='email'
                type='email'
                autoComplete='off'
                placeholder='Enter your email'
                className='py-5'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password' className='font-semibold text-base'>
                Password:
              </Label>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
                className='py-5'
                required
              />
            </div>

            <Button type='submit' className='w-full text-base py-5'>
              Sign In
            </Button>
          </form>

          <div className='mt-4 text-center text-sm'>
            <a href='#' className='hover:underline text-gray-600 font-medium'>
              Forgot your password?
            </a>
          </div>

          <p className='mt-6 text-center text-sm text-gray-500'>
            Don't have an account?{" "}
            <Link
              to='/signup'
              className='font-medium text-black hover:underline'
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};
export default LoginPage;
