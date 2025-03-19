import  { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
 
const ContactUs = () => {
    const form = useRef();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
 
    const sendEmail = (e) => {
        e.preventDefault();
 
        emailjs.sendForm('service_g54e1qn', 'template_atq1r34', form.current, 'E-s2TiiRkbTEwB44F')
            .then(
                (result) => {
                    console.log('SUCCESS', result.text);
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                        setShowSuccessMessage(false);
                    }, 3000);
                },
                (error) => {
                    console.log('FAILED...', error.text);
                }
            );
    };
 
    return (
        <section className="bg-gradient-to-br from-white-50 to-white-100 dark:from-slate-900 dark:to-slate-800" id="contact">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white">
                        Get in Touch
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">
                    We&apos;d love to hear from you. Fill out the form below or reach us directly!
                    </p>
                </div>
    
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Details */}
                    <div className="space-y-8">
                        {/* Address */}
                        <div className="flex items-start">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white shadow-lg">
                                📍
                            </div>
                            <div className="ml-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Address</h3>
                                <p className="text-gray-600 dark:text-slate-400">
                                    Cartechindia Headquarters<br />
                                    123 Car Avenue, Pune, Maharashtra, 441122<br />
                                    India
                                </p>
                            </div>
                        </div>
    
                        {/* Contact */}
                        <div className="flex items-start">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white shadow-lg">
                                📞
                            </div>
                            <div className="ml-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Contact</h3>
                                <p className="text-gray-600 dark:text-slate-400">
                                    Name: Asif Attar<br />
                                    Mobile: <a href="tel:+917755994123" className="text-blue-500 hover:text-blue-700">+91 7755994123</a><br />
                                    Email: <a href="mailto:asif.attar@caryanam.in" className="text-blue-500 hover:text-blue-700">asif.attar@caryanam.in</a>
                                </p>
                            </div>
                        </div>
    
                        {/* Working Hours */}
                        <div className="flex items-start">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white shadow-lg">
                                🕒
                            </div>
                            <div className="ml-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Working Hours</h3>
                                <p className="text-gray-600 dark:text-slate-400">
                                    Monday - Friday : 08:00 AM - 09:00 PM
                                </p>
                            </div>
                        </div>
                    </div>
    
                    {/* Contact Form */}
                    <div className="bg-white dark:bg-slate-700 shadow-xl rounded-2xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Let Us Contact You</h2>
                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            {/* Name */}
                            <div>
                                <input
                                    type="text"
                                    id="from_name"
                                    autoComplete="name"
                                    placeholder="Your name"
                                    className="w-full border border-black dark:border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-800 dark:text-white"
                                    name="from_name"
                                />
                            </div>
                            {/* Email */}
                            <div>
                                <input
                                    type="email"
                                    id="email_id"
                                    autoComplete="email"
                                    placeholder="Your email address"
                                    className="w-full border border-black dark:border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-800 dark:text-white"
                                    name="email_id"
                                />
                            </div>
                            {/* Message */}
                            <div>
                                <textarea
                                    id="message"
                                    name="message"
                                    cols="30"
                                    rows="5"
                                    placeholder="Please share your feedback..."
                                    className="w-full border border-black dark:border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-800 dark:text-white"
                                ></textarea>
                            </div>
                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                        {showSuccessMessage && (
                            <div className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                                ✅ Our team will contact you soon!
                            </div>
                        )}
                    </div>
                </div>
    
                {/* Google Map */}
                <div className="mt-12 overflow-hidden rounded-xl shadow-lg">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.4708784999343!2d73.94672727501393!3d18.552798082547003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c34a95da0099%3A0x66edab93b328b0be!2sWorld%20Trade%20Center%2C%20Tower%201!5e0!3m2!1sen!2sin!4v1717405232723!5m2!1sen!2sin"
                        width="100%"
                        height="400"
                        style={{ border: '0' }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </section>
    );
    
};
 
export default ContactUs;