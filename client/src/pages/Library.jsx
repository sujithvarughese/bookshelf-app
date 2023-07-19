import { useEffect, useState } from "react";
import { axDB } from "../utils/ax";
import { Book } from "../components";

const Library = () => {
  const [myLibrary, setMyLibrary] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axDB("/library");
      const { library } = response.data;
      setMyLibrary(library);
    };
    fetchBooks()
  }, []);

  return (
    <div>
      <>My Library</>
      {myLibrary?.map((book) => {
        return (
            <Book key={book.title} {...book} />
        );
      })}
    </div>
  );
};

export default Library;
