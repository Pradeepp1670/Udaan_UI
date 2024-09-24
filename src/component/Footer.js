import React from 'react';
import '../css/footer.css'

const Footer = () => {
    return (
        <footer className="bg-purple-950  text-center text-gray-200">
            <div className="flex justify-around py-5 items-center">
                <div className="my-5">
                    <h4 className='mb-2.5 text-lg'>About Us</h4>
                    <p className='my-1.5'>We are a team of passionate developers building web applications.</p>
                </div>
                <div className="my-2.5">
                    <h4>Contact</h4>
                    <p>Email: pradeeppunjabi70@gmail.com</p>
                    <p>Phone: +91 9685675196</p>
                </div>
                <div className="my-2.5">
                    <h4>Follow Us</h4>
                    <ul className='flex justify-center text-white decoration-clone no-underline m-0'>
                        <li className='mx-2.5'><a href="https://www.facebook.com/pradeep.punjabi.923" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li className='mx-2.5'><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li className='mx-2.5'><a href="https://www.linkedin.com/in/pradeepp1670/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-5">
                <p>&copy; {new Date().getFullYear()} Udaan. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
