import { Mail, Phone } from "lucide-react";
import Input from "@components/Input/Input";

const ContactPage = () => {
  return (
    <main className='border flex-1 flex flex-col items-center justify-center gap-7 lg:flex-row lg:px-5'>
      <section
        id='text-info'
        className='border p-8 shadow space-y-8 rounded-lg'
      >
        <section id='call-support' className='space-y-4'>
          <div className='flex items-center gap-2'>
            <span className='bg-red-400 p-2 rounded-full'>
              <Phone color='white' />
            </span>
            <h1 className='font-semibold text-lg'>Call To US</h1>
          </div>
          <div className='font-medium text-sm space-y-1'>
            <p>We are available 24/7, 7 days a week</p>
            <p>Phone: +9876543210</p>
          </div>
        </section>
        <hr />
        <section id='email-support' className='space-y-4'>
          <div className='flex items-center gap-2'>
            <span className='bg-red-400 p-2 rounded-full'>
              <Mail color='white' />
            </span>
            <h1 className='font-semibold text-lg'>Write to US</h1>
          </div>

          <div className='text-sm'>
            <p className='w-3/4'>
              Fill out our form we will contact you within 24 hours
            </p>
          </div>
        </section>
      </section>
      <section
        id='contact-form'
        className='mx-5 px-6 py-8 border rounded-lg shadow flex flex-col gap-4 lg:mx-0'
      >
        <form className='grid-form' onSubmit={(e) => e.preventDefault()}>
          <Input inputType='text' inputHolder='Your name' />
          <Input inputType='email' inputHolder='Your Email' />
          <textarea cols={20} rows={5} placeholder='Your Message'></textarea>
        </form>
        <button
          type='submit'
          className='w-fit self-end bg-red-400 text-white px-6 py-2 rounded-md font-semibold hover:cursor-pointer hover:bg-red-600 transition-all active:bg-red-400 shadow-md'
        >
          Send Message
        </button>
      </section>
    </main>
  );
};
export default ContactPage;
