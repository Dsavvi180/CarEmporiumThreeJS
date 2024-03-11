import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import Loader from "../components/Loader";
import PorscheGT3 from "../models/porscheGT3";
import SideBar from "../components/Sidebar";
// import { Stats } from "@react-three/drei";
import StatsCard from "../components/StatsCard";

// <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
//   POP
// </div>;

function ModelPorscheGT3() {
  const [isRotating, setIsRotating] = useState(false);
  // use this function to change the positioning values of the component based on screen size or other externalities
  // pass the positioning variables through to the component for dynamically updated values
  // accept the props in the component's function itself by passing them through as parameters
  const adjustCarForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = !inIframe ? [4.9, 4.9, 4.9] : [10.9, 10.9, 10.9]; //90% of full size of model
      screenPosition = [0, -6.5, -43]; // x,y,z axis positioning
    } else {
      screenScale = [11, 11, 11]; //full size of model
      screenPosition = [0, -8.5, -43];
    }
    return [screenScale, screenPosition, rotation];
  };
  const [inIframe, setInIframe] = useState(false);

  useEffect(() => {
    if (window.location !== window.parent.location) {
      setInIframe(true);
    }
  }, [window.onload]);
  const [carScale, carPosition, carRotation] = adjustCarForScreenSize(); //pass these variables to Car component as props
  return (
    <section className="w-full h-[100vh] relative bg-[#F9F6EE] z-10 overflow-hidden">
      <SideBar />
      <StatsCard />
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          {/* simulates light coming from a distant source, like the sun. The
          position attribute adjusts the angle of the light from the 'sun' */}
          <directionalLight position={[1, 10.5, 20]} intensity={6} />
          {/* ambient light illuminates all objects in the scene equally without
          asting shadwos */}
          <ambientLight intensity={0.9} />
          {/* emits light in all directions from a single point - not required in this case, there is sun and ambience */}
          {/* <pointLight position={[1, 1, 1]} intensity={1} /> */}
          {/* spotlight is similar to point light in the sense it emits light from one direction, but in this case, in the shape of a cone.Provide an angle.*/}
          {/* <spotLight position={[1, 1, 1]} angle={0.5 * Math.PI} /> */}
          {/* hemisphere light illuminates the scene with a gradient */}
          {/* <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          /> */}
          <PorscheGT3
            scale={carScale}
            position={carPosition}
            rotation={carRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
        </Suspense>
      </Canvas>
    </section>
  );
}

export default ModelPorscheGT3;
