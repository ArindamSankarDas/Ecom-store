import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Label } from "@components/ui/label";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <main className='flex-1 flex justify-center items-center py-10 px-3 md:py-14'>
      <Card className='w-full max-w-md shadow'>
        <CardHeader>
          <CardTitle className='text-2xl text-center font-bold'>
            Create a New Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className='space-y-5'>
            <div className='space-y-2'>
              <Label htmlFor='name' className='font-semibold text-base'>
                Name:
              </Label>
              <Input
                id='name'
                type='name'
                placeholder='Enter your name'
                className='py-5'
                required
              />
            </div>
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
            <div className='space-y-2'>
              <Label
                htmlFor='confirm-password'
                className='font-semibold text-base'
              >
                Confirm Password:
              </Label>
              <Input
                id='confirm-password'
                type='password'
                placeholder='Enter your password'
                className='py-5'
                required
              />
            </div>

            <Button type='submit' className='w-full text-base py-5'>
              Sign Up
            </Button>
          </form>

          <p className='mt-6 text-center text-sm text-gray-500'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='font-medium text-black hover:underline'
            >
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};
export default SignUpPage;
