"use client"

import Image from 'next/image';
import sectionImg from '@/../public/store/contactus.jpg'
import { Button } from '@/tremorComponents/Button';
import { FormEvent, useState } from 'react';
import { Card } from '@/tremorComponents/Card';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulate a form submission (you can replace this with actual API call)
    console.log({ name, email, message });
    setSuccess(true);

    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');
  };


  return (
    <section className='langingpage-container px-4 lg:px-0 mt-20 flex flex-col-reverse md:flex-row items-center justify-between gap-8'>
      <Card className="flex-1 w-full p-2 md:p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        {success && <p className="text-green-600 mb-4">Your message has been sent successfully!</p>}
        <form onSubmit={handleSubmit} className="p-6 border-2 border-gray-600 border-dashed rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border-2 border-gray-700 border-dashed rounded bg-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border-2 border-gray-700 border-dashed rounded bg-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 block w-full p-2 border-2 border-gray-700 border-dashed rounded bg-transparent"
              rows={4}
            ></textarea>
          </div>
          <Button
            type="submit"
          // variant='secondary'

          >
            Send Message
          </Button>
        </form>
      </Card>

      <div className='w-full flex-1 rounded-full overflow-hidden border-2 border-gray-600 border-dashed p-1 '>
        <Image
          src={sectionImg}
          alt='hero image'
          width={2000}
          height={2000}
          className='aspect-[5/3] w-full rounded-full'
        />
      </div>
    </section>
  )


};

export default ContactSection;
