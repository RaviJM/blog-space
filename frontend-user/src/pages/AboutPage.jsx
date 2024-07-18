import Navbar from "../components/navbar/Navbar";

function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col flex-grow items-center justify-center bg-gray-100 p-8">
        <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-xl mb-4">Hey Guys! I'm Ravi Makwana</p>
          <p className="mb-4">
            I made this website for personal blogging about topics that might
            interest people around the world.
          </p>
          <p className="mb-4">
            The website is currently limited to just me posting blogs, but in
            future, the creater version of the same website will allow anyone to
            upload their own blog posts! Sounds amazing right?
          </p>
          <p className="mb-4">
            Do consider sharing this website with your friends, and help me make
            this an amazing blog website!
          </p>
          <p className="text-lg font-semibold">Cheers! Have a great day.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
