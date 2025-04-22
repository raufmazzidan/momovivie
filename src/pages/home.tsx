import Button from "../components/atoms/button";

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1>
      <Button>Hello</Button>
      <Button variant="outline">World</Button>
    </div>
  );
}

export default Home;
