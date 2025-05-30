import { useEffect, useState } from "react";

const useMousePointer = () => {
  const [mousePositition, setMousePosition] = useState({
    locX: 0,
    locY: 0,
  });

  useEffect(() => {
    console.log("mounted", mousePositition);
    window.addEventListener("mousemove", (event) => {
      setMousePosition({ locX: event.clientX, locY: event.clientY });
    });
    return () => {
      console.log("Unmounting lsiter");
      window.removeEventListener("mousemove", () => {}); //this is used to unmount the mouse event listener
    };
  }, []);

  return mousePositition;
};
export default useMousePointer;
