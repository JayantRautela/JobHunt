import { Button } from "@/components/ui/button"


function App() {

  const btnClick = () => {
    alert("Wlecome to JobHunt!!");
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Button onClick={btnClick}>Click Me</Button>
      </div>
    </>
  )
}

export default App
