import { Library, Discover } from "./pages";

const App = () => {

  return (
    <div className="max-w-5xl mx-auto">
       <div className="text-3xl">Bookshelf-app</div>

       <Library />
       <Discover />
    </div>
  )
}

export default App
