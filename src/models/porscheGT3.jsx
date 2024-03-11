import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import Model from "../assets/porsche_gt3_rs.glb";
import { a } from "@react-spring/three";
// import { isRotating } from "../pages/Home";

//Note: when attempting to render a .glb file, you must add the following configurations to the
//vite.config.js file: export default defineConfig({
//   plugins: [react()],
//   assetsInclude: ["**/*.glb"],
// });

const PorscheGT3 = (props) => {
  const { screenPosition, screenScale, rotation, isRotating, setIsRotating } =
    props;
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(Model);
  const carRef = useRef();
  console.log(isRotating);
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.6;

  const handlePointerDown = (e) => {
    // e for event: ie. event.touches / event.mousedown/ something like that
    // stopProgation will stop the mouse(pointer) click from propagating/bubbling through to other elements of the scree
    // besides this element.
    e.stopPropagation();
    e.preventDefault();
    //ie. a default function that reloads the page
    setIsRotating(true);
    // figures out what type of touch it is - like from mobile or mouse and desktop
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    lastX.current = clientX; //sets the useRef hook to the updated value of mousedown position
  };
  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };
  //handlePointerMove should only be called while the scene is rotating
  // it does the same thing as handlePointerUp, so we pass the event into handlePointerUp
  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      //calculate change in horizontal position: position of mouse on mouseUp - position of mouse on mouseDown which is stored in lastX.current
      // using useRef() divided by viewport.width
      const delta = (clientX - lastX.current) / viewport.width;
      //now update Car's rotation based on the position of the mouse - use Math.PI because working with a circle
      carRef.current.rotation.y += delta * 0.01 * Math.PI;
      //now update the lastX value
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) {
        setIsRotating(true);
      }
      carRef.current.rotation.y += 0.01 * Math.PI;
    } else if (e.key === "ArrowRight") {
      if (!isRotating) {
        setIsRotating(true);
      }
      carRef.current.rotation.y -= 0.01 * Math.PI;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowRight" || "ArrowLeft") {
      setIsRotating(false);
    }
  };

  //put the functions to action using a useFrame function/hook - it accepts a callback function that executes
  // on every single frame
  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor; //if not rotating, damping will make rotation smoother
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
      carRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = carRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      //   switch (true) {
      //     case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
      //       setCurrentStage(4);
      //       break;
      //     case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
      //       setCurrentStage(3);
      //       break;
      //     case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
      //       setCurrentStage(2);
      //       break;
      //     case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
      //       setCurrentStage(1);
      //       break;
      //     default:
      //       setCurrentStage(null);
      //   }
    }
  });
  //Now for the execution of these functions in a useEffect hook

  useEffect(() => {
    //This attaches the eventListeners to the canvas DOM - when we click the scene, we aren't touching the regular
    //DOM, but the canvas instead
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    gl,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleKeyUp,
    handleKeyDown,
  ]);

  return (
    <a.group {...props} ref={carRef} dispose={null}>
      <group scale={0.01}>
        <group
          position={[0, 123.313, -209.788]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_carbon_Wing_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_carbon_Wing_TwiXeR_992_carPaint003_0
                .geometry
            }
            material={materials["TwiXeR_992_carPaint.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_carbon_Wing_TwiXeR_992_CSR2_Badge_0
                .geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_carbon_Wing_TwiXeR_992_carbon_roof001_0
                .geometry
            }
            material={materials["TwiXeR_992_carbon_roof.001"]}
          />
        </group>
        <group
          position={[0, 123.585, -44.17]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_carbon_roof_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_carbon_roof_TwiXeR_992_carbon_roof001_0
                .geometry
            }
            material={materials["TwiXeR_992_carbon_roof.001"]}
          />
        </group>
        <group
          position={[0, 72.5, 158.038]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_carbon_hood_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_carbon_hood_TwiXeR_992_carPaint003_0
                .geometry
            }
            material={materials["TwiXeR_992_carPaint.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_carbon_hood_TwiXeR_992_metal_radiator002_0
                .geometry
            }
            material={materials["TwiXeR_992_metal_radiator.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes[
                "TwiXeR_992_gt3rs_carbon_hood_TwiXeR_992_carPaint_secondary|hoodbadge_a001_0"
              ].geometry
            }
            material={materials["TwiXeR_992_headlight_1.001_0"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_carbon_hood_TwiXeR_992_carbon_roof001_0
                .geometry
            }
            material={materials["TwiXeR_992_carbon_roof.001"]}
          />
        </group>
        <group
          position={[88.681, 32.122, 47.003]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_sideskirts_L_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_sideskirts_L_TwiXeR_992_glass002_0.geometry
            }
            material={materials["TwiXeR_992_glass.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_sideskirts_L_TwiXeR_992_headlight001_0
                .geometry
            }
            material={materials["TwiXeR_992_symbols.004"]}
          />
        </group>
        <group
          position={[-88.681, 32.122, 47.003]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_sideskirts_R_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_sideskirts_R_TwiXeR_992_glass002_0.geometry
            }
            material={materials["TwiXeR_992_glass.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_sideskirts_R_TwiXeR_992_headlight001_0
                .geometry
            }
            material={materials["TwiXeR_992_symbols.004"]}
          />
        </group>
        <group
          position={[0, 93.51, -184.422]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_tailgate_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_tailgate_TwiXeR_992_metal_radiator002_0
                .geometry
            }
            material={materials["TwiXeR_992_metal_radiator.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_tailgate_TwiXeR_992_CSR2_Badge_0.geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_tailgate_TwiXeR_992_glass002_0.geometry
            }
            material={materials["TwiXeR_992_glass.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_tailgate_TwiXeR_992_brakelight_1001_0
                .geometry
            }
            material={materials["TwiXeR_992_symbols.004"]}
          />
        </group>
        <group
          position={[30.431, 123.233, -205.085]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_left_leg_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_left_leg_TwiXeR_992_CSR2_Badge_0.geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
        </group>
        <group
          position={[0.004, 43.891, -207.819]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_bumper_R_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_bumper_R_TwiXeR_992_glass002_0.geometry
            }
            material={materials["TwiXeR_992_glass.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_bumper_R_TwiXeR_992_carPaint003_0.geometry
            }
            material={materials["TwiXeR_992_carPaint.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_bumper_R_TwiXeR_992_antichrome001_0
                .geometry
            }
            material={materials["TwiXeR_992_antichrome.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_bumper_R_TwiXeR_992_red001_0.geometry
            }
            material={materials["TwiXeR_992_red.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_bumper_R_TwiXeR_992_metal_radiator002_0
                .geometry
            }
            material={materials["TwiXeR_992_metal_radiator.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_bumper_R_TwiXeR_992_headlight001_0.geometry
            }
            material={materials["TwiXeR_992_symbols.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_bumper_R_TwiXeR_992_CSR2_Badge_0.geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
        </group>
        <group
          position={[-0.398, 31.196, 189.4]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_bumper_F_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_bumper_F_TwiXeR_992_carPaint003_0.geometry
            }
            material={materials["TwiXeR_992_carPaint.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_bumper_F_TwiXeR_992_metal_radiator002_0
                .geometry
            }
            material={materials["TwiXeR_992_metal_radiator.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_bumper_F_TwiXeR_992_glass002_0.geometry
            }
            material={materials["TwiXeR_992_glass.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_bumper_F_TwiXeR_992_signal_L_bumper001_0
                .geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
        </group>
        <group
          position={[82.768, 68.16, 110.886]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_fender_L_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_fender_L_TwiXeR_992_carPaint003_0.geometry
            }
            material={materials["TwiXeR_992_carPaint.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_fender_L_TwiXeR_992_metal_radiator002_0
                .geometry
            }
            material={materials["TwiXeR_992_metal_radiator.002"]}
          />
        </group>
        <group
          position={[79.498, 54.541, -6.896]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_door_L_TwiXeR_992_carPaint003_0.geometry
            }
            material={materials["TwiXeR_992_carPaint.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_door_L_TwiXeR_992_rubbertrim004_0.geometry
            }
            material={materials["TwiXeR_992_headlight_1.001_1"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_door_L_TwiXeR_992_plastic_mgl001_0.geometry
            }
            material={materials["TwiXeR_992_plastic_mgl.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_door_L_TwiXeR_992_rivet_001_FFFFFFFF001_0
                .geometry
            }
            material={materials["TwiXeR_992_symbols.004"]}
          />
        </group>
        <group
          position={[-79.688, 54.146, -3.838]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_door_R_TwiXeR_992_carPaint003_0.geometry
            }
            material={materials["TwiXeR_992_carPaint.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_door_R_TwiXeR_992_rubbertrim004_0.geometry
            }
            material={materials["TwiXeR_992_headlight_1.001_1"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_door_R_TwiXeR_992_plastic_mgl001_0.geometry
            }
            material={materials["TwiXeR_992_plastic_mgl.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_door_R_TwiXeR_992_rivet_001_FFFFFFFF001_0
                .geometry
            }
            material={materials["TwiXeR_992_symbols.004"]}
          />
        </group>
        <group
          position={[1.343, 78.637, -39.622]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_rubbertrim004_0.geometry
            }
            material={materials["TwiXeR_992_headlight_1.001_1"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_plastic002_0.geometry
            }
            material={materials["TwiXeR_992_symbols.004_0"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_carPaint003_0.geometry
            }
            material={materials["TwiXeR_992_carPaint.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_body_gt3rs_TwiXeR_992_ID04_plastic_textured_001_060606FF001_0
                .geometry
            }
            material={
              materials["TwiXeR_992_ID04_plastic_textured_001_060606FF.001"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_carpet001_0.geometry
            }
            material={materials["TwiXeR_992_carpet.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_speakers001_0.geometry
            }
            material={materials["TwiXeR_992_speakers.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_blackGlass001_0.geometry
            }
            material={materials["TwiXeR_992_blackGlass.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_metal_radiator002_0
                .geometry
            }
            material={materials["TwiXeR_992_metal_radiator.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_mirror001_0.geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_ID10_chrome001_0.geometry
            }
            material={materials["TwiXeR_992_symbols_1.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_undercarriage001_0.geometry
            }
            material={materials["TwiXeR_992_symbols.004_1"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_ID08_fabric_002001_0
                .geometry
            }
            material={materials["TwiXeR_992_ID08_fabric_002.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_ID12_paint001_0.geometry
            }
            material={materials["TwiXeR_992_symbols.004_2"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_rivet_001_747474FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_rivet_001_747474FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_roof_alc001_0.geometry
            }
            material={materials["TwiXeR_992_headlight_1.001_2"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_seatbelt001_0.geometry
            }
            material={materials["TwiXeR_992_seatbelt.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_plastic_1001_0.geometry
            }
            material={materials["TwiXeR_992_plastic_1.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_symbols002_0.geometry
            }
            material={materials["TwiXeR_992_gauges_chrome.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_body_gt3rs_TwiXeR_992_int_chrome003_0.geometry
            }
            material={materials["TwiXeR_992_int_chrome.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_body_gt3rs_TwiXeR_992_ID03_stitch_001_111111FF003_0
                .geometry
            }
            material={materials["TwiXeR_992_symbols.004"]}
          />
        </group>
        <group
          position={[-30.437, 123.281, -205.26]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_right_leg_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_right_leg_TwiXeR_992_CSR2_Badge_0.geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
        </group>
        <group
          position={[-82.835, 68.606, 109.568]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_fender_R_TwiXeR_992_plastic_mgl_060606FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_fender_R_TwiXeR_992_carPaint003_0.geometry
            }
            material={materials["TwiXeR_992_carPaint.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gt3rs_fender_R_TwiXeR_992_metal_radiator002_0
                .geometry
            }
            material={materials["TwiXeR_992_metal_radiator.002"]}
          />
        </group>
        <group
          position={[90.293, 29.774, 116.281]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={120.769}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9_TwiXeR_992_GT3RS_black_0
                .geometry
            }
            material={materials.TwiXeR_992_GT3RS_black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9_TwiXeR_992_wheels_chrome_1_0
                .geometry
            }
            material={materials.TwiXeR_992_wheels_chrome_1}
          />
        </group>
        <group
          position={[0, 27.917, -225.078]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_exhausttip_3_antichrome_TwiXeR_992_exhausttip_antichrome001_0
                .geometry
            }
            material={materials["TwiXeR_992_exhausttip_antichrome.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_exhausttip_3_antichrome_TwiXeR_992_rubbertrim006_0
                .geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_exhausttip_3_antichrome_TwiXeR_992_int_chrome004_0
                .geometry
            }
            material={materials["TwiXeR_992_symbols.004"]}
          />
        </group>
        <group position={[34.47, 82.77, 36.853]} rotation={[-3.002, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_needle_tacho_TwiXeR_992_gauges_chrome001_0
                .geometry
            }
            material={materials["TwiXeR_992_gauges_chrome.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_needle_tacho_TwiXeR_992_ID08_fabric_002_FFFFFFFF003_0
                .geometry
            }
            material={materials["TwiXeR_992_ID08_fabric_002_FFFFFFFF.003"]}
          />
        </group>
        <group
          position={[0, 27.917, -225.078]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_exhausttip_3_chrome_TwiXeR_992_rubbertrim006_0
                .geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_exhausttip_3_chrome_TwiXeR_992_chrome002_0
                .geometry
            }
            material={materials["TwiXeR_992_symbols.004"]}
          />
        </group>
        <group position={[34.47, 82.77, 36.853]} rotation={[-3.002, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_needle_tacho_9000_TwiXeR_992_gauges_chrome001_0
                .geometry
            }
            material={materials["TwiXeR_992_gauges_chrome.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_needle_tacho_9000_TwiXeR_992_ID08_fabric_002_FFFFFFFF003_0
                .geometry
            }
            material={materials["TwiXeR_992_ID08_fabric_002_FFFFFFFF.003"]}
          />
        </group>
        <group
          position={[34.976, 41.163, 71.668]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_clutchpedal_TwiXeR_992_rubbertrim008_0.geometry
            }
            material={materials["TwiXeR_992_rubbertrim.008"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_clutchpedal_TwiXeR_992_int_chrome005_0.geometry
            }
            material={materials["TwiXeR_992_int_chrome.005"]}
          />
        </group>
        <group
          position={[13.497, 32.769, 74.073]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gaspedal_TwiXeR_992_rubbertrim008_0.geometry
            }
            material={materials["TwiXeR_992_rubbertrim.008"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_gaspedal_TwiXeR_992_int_chrome005_0.geometry
            }
            material={materials["TwiXeR_992_int_chrome.005"]}
          />
        </group>
        <group
          position={[23.06, 41.163, 71.668]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_brakepedal_TwiXeR_992_rubbertrim008_0.geometry
            }
            material={materials["TwiXeR_992_rubbertrim.008"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_brakepedal_TwiXeR_992_int_chrome005_0.geometry
            }
            material={materials["TwiXeR_992_int_chrome.005"]}
          />
        </group>
        <group
          position={[47.947, 76.638, 29.708]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes[
                "TwiXeR_992_signalstalk_TwiXeR_992_ID03_stitch_001|vents_a003_0"
              ].geometry
            }
            material={materials["TwiXeR_992_ID03_stitch_001vents_a.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_signalstalk_TwiXeR_992_rubbertrim009_0.geometry
            }
            material={materials["TwiXeR_992_rubbertrim.009"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_signalstalk_TwiXeR_992_symbols004_0.geometry
            }
            material={materials["TwiXeR_992_symbols.004"]}
          />
        </group>
        <group
          position={[34.52, 75.061, 19.209]}
          rotation={[-2.793, 0, Math.PI]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TwiXeR_992_steer_3_TwiXeR_992_Interior_D_0.geometry}
            material={materials.TwiXeR_992_Interior_D}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_steer_3_TwiXeR_992_ID06_stitch_001_0.geometry
            }
            material={materials.TwiXeR_992_ID06_stitch_001}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_steer_3_TwiXeR_992_ID03_stitch_001_111111FF005_0
                .geometry
            }
            material={materials["TwiXeR_992_ID03_stitch_001_111111FF.005"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TwiXeR_992_steer_3_TwiXeR_992_carpet002_0.geometry}
            material={materials["TwiXeR_992_carpet.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_steer_3_TwiXeR_992_ID01_plastic_lgl_010101FF_0
                .geometry
            }
            material={materials.TwiXeR_992_ID01_plastic_lgl_010101FF}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TwiXeR_992_steer_3_TwiXeR_992_symbols_6_0.geometry}
            material={materials.TwiXeR_992_symbols_6}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_steer_3_TwiXeR_992_symbols_1003_0.geometry
            }
            material={materials["TwiXeR_992_symbols_1.003_0"]}
          />
        </group>
        <group position={[0, 110.009, -127.739]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_backlight_tint_TwiXeR_992_glass004_0.geometry
            }
            material={materials["TwiXeR_992_glass.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_backlight_tint_TwiXeR_992_glass_int001_0.geometry
            }
            material={materials["TwiXeR_992_glass_int.001"]}
          />
        </group>
        <group position={[12.558, 69.061, 30.243]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TwiXeR_992_dash_9000_parkingbrake_1001_0.geometry}
            material={materials["TwiXeR_992_gauges_9000.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_dash_9000_TwiXeR_992_ID03_stitch_001_111111FF006_0
                .geometry
            }
            material={materials["TwiXeR_992_ID03_stitch_001_111111FF.006"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_9000_TwiXeR_992_plastic004_0.geometry
            }
            material={materials["TwiXeR_992_plastic.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes[
                "TwiXeR_992_dash_9000_TwiXeR_992_ID03_stitch_001|vents_a004_0"
              ].geometry
            }
            material={materials["TwiXeR_992_ID03_stitch_001vents_a.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes[
                "TwiXeR_992_dash_9000_TwiXeR_992_ID04_plastic_textured_001|shifterassy_a003_0"
              ].geometry
            }
            material={
              materials["TwiXeR_992_ID04_plastic_textured_001shifterassy_a.003"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes[
                "TwiXeR_992_dash_9000_TwiXeR_992_ID08_fabric_002|centerconsolestructure_a003_0"
              ].geometry
            }
            material={
              materials[
                "TwiXeR_992_ID08_fabric_002centerconsolestructure_a.003"
              ]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes[
                "TwiXeR_992_dash_9000_TwiXeR_992_ID05_leather_coarse_mgl|vents_a003_0"
              ].geometry
            }
            material={
              materials["TwiXeR_992_ID05_leather_coarse_mglvents_a.003"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_9000_TwiXeR_992_seat_leather004_0.geometry
            }
            material={materials["TwiXeR_992_seat_leather.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_9000_TwiXeR_992_ID02_leather_MGL003_0
                .geometry
            }
            material={materials["TwiXeR_992_ID02_leather_MGL.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_9000_TwiXeR_992_rubbertrim011_0.geometry
            }
            material={materials["TwiXeR_992_rubbertrim.011"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_9000_TwiXeR_992_gps_screen003_0.geometry
            }
            material={materials["TwiXeR_992_gps_screen.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_9000_TwiXeR_992_upper_leather004_0.geometry
            }
            material={materials["TwiXeR_992_upper_leather.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_9000_TwiXeR_992_plastic_2003_0.geometry
            }
            material={materials["TwiXeR_992_plastic_2.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_9000_TwiXeR_992_gauges_1003_0.geometry
            }
            material={materials["TwiXeR_992_gauges_1.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_9000_TwiXeR_992_gauges_9000001_0.geometry
            }
            material={materials["TwiXeR_992_gauges_9000.001_0"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_9000_TwiXeR_992_ID03_stitch_001003_0
                .geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
        </group>
        <group position={[0.019, 87.074, 56.87]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_clock_TwiXeR_992_plastic004_0.geometry
            }
            material={materials["TwiXeR_992_plastic.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes[
                "TwiXeR_992_dash_clock_TwiXeR_992_ID05_leather_coarse_mgl|vents_a003_0"
              ].geometry
            }
            material={
              materials["TwiXeR_992_ID05_leather_coarse_mglvents_a.003"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_clock_TwiXeR_992_rubbertrim011_0.geometry
            }
            material={materials["TwiXeR_992_rubbertrim.011"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_clock_TwiXeR_992_glass004_0.geometry
            }
            material={materials["TwiXeR_992_glass.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_clock_TwiXeR_992_dash_clock_1001_0.geometry
            }
            material={materials["TwiXeR_992_dash_clock_1.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_clock_TwiXeR_992_gauges_chrome_2001_0
                .geometry
            }
            material={materials["TwiXeR_992_gauges_chrome_2.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_clock_TwiXeR_992_int_chrome007_0.geometry
            }
            material={materials["TwiXeR_992_int_chrome.007"]}
          />
        </group>
        <group position={[0.059, 85.114, 55.573]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_noclock_TwiXeR_992_plastic004_0.geometry
            }
            material={materials["TwiXeR_992_plastic.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes[
                "TwiXeR_992_dash_noclock_TwiXeR_992_ID05_leather_coarse_mgl|vents_a003_0"
              ].geometry
            }
            material={
              materials["TwiXeR_992_ID05_leather_coarse_mglvents_a.003"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_dash_noclock_TwiXeR_992_rubbertrim011_0.geometry
            }
            material={materials["TwiXeR_992_rubbertrim.011"]}
          />
        </group>
        <group position={[65.511, 103.002, -19.207]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_doorglass_L_tint_TwiXeR_992_glass004_0.geometry
            }
            material={materials["TwiXeR_992_glass.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_doorglass_L_tint_TwiXeR_992_glass_int001_0
                .geometry
            }
            material={materials["TwiXeR_992_glass_int.001"]}
          />
        </group>
        <group position={[-65.505, 103.028, -18.835]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_doorglass_R_tint_TwiXeR_992_glass004_0.geometry
            }
            material={materials["TwiXeR_992_glass.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_doorglass_R_tint_TwiXeR_992_glass_int001_0
                .geometry
            }
            material={materials["TwiXeR_992_glass_int.001"]}
          />
        </group>
        <group position={[67.638, 64.175, 3.292]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_L_antichrome_TwiXeR_992_plastic_mgl_060606FF002_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_L_antichrome_TwiXeR_992_ID03_stitch_001_111111FF006_0
                .geometry
            }
            material={materials["TwiXeR_992_ID03_stitch_001_111111FF.006"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_L_antichrome_TwiXeR_992_ID09_rubbertrim_FFFFFFFF002_0
                .geometry
            }
            material={materials["TwiXeR_992_ID09_rubbertrim_FFFFFFFF.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_L_antichrome_TwiXeR_992_ID04_plastic_textured_001_060606FF002_0
                .geometry
            }
            material={
              materials["TwiXeR_992_ID04_plastic_textured_001_060606FF.002"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes[
                "TwiXeR_992_doorpanel_L_antichrome_TwiXeR_992_ID05_leather_coarse_mgl|shifterassy_a_2002_0"
              ].geometry
            }
            material={
              materials["TwiXeR_992_ID05_leather_coarse_mglshifterassy_a_2.002"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_L_antichrome_TwiXeR_992_ID08_fabric_002_FFFFFFFF005_0
                .geometry
            }
            material={materials["TwiXeR_992_gauges_9000.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_L_antichrome_TwiXeR_992_seat_leather004_0
                .geometry
            }
            material={materials["TwiXeR_992_seat_leather.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_L_antichrome_TwiXeR_992_ID05_leather_coarse_mgl_171717FF002_0
                .geometry
            }
            material={
              materials["TwiXeR_992_ID05_leather_coarse_mgl_171717FF.002"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_doorpanel_L_antichrome_TwiXeR_992_speakers002_0
                .geometry
            }
            material={materials["TwiXeR_992_speakers.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_doorpanel_L_antichrome_TwiXeR_992_symbols005_0
                .geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_L_antichrome_TwiXeR_992_upper_leather004_0
                .geometry
            }
            material={materials["TwiXeR_992_upper_leather.004"]}
          />
        </group>
        <group position={[-67.563, 64.655, 3.588]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_R_antichrome_TwiXeR_992_plastic_mgl_060606FF002_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_mgl_060606FF.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_R_antichrome_TwiXeR_992_ID03_stitch_001_111111FF006_0
                .geometry
            }
            material={materials["TwiXeR_992_ID03_stitch_001_111111FF.006"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_R_antichrome_TwiXeR_992_ID09_rubbertrim_FFFFFFFF002_0
                .geometry
            }
            material={materials["TwiXeR_992_ID09_rubbertrim_FFFFFFFF.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_R_antichrome_TwiXeR_992_ID04_plastic_textured_001_060606FF002_0
                .geometry
            }
            material={
              materials["TwiXeR_992_ID04_plastic_textured_001_060606FF.002"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes[
                "TwiXeR_992_doorpanel_R_antichrome_TwiXeR_992_ID05_leather_coarse_mgl|shifterassy_a_2002_0"
              ].geometry
            }
            material={
              materials["TwiXeR_992_ID05_leather_coarse_mglshifterassy_a_2.002"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_R_antichrome_TwiXeR_992_ID08_fabric_002_FFFFFFFF005_0
                .geometry
            }
            material={materials["TwiXeR_992_gauges_9000.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_R_antichrome_TwiXeR_992_seat_leather004_0
                .geometry
            }
            material={materials["TwiXeR_992_seat_leather.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_R_antichrome_TwiXeR_992_ID05_leather_coarse_mgl_171717FF002_0
                .geometry
            }
            material={
              materials["TwiXeR_992_ID05_leather_coarse_mgl_171717FF.002"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_doorpanel_R_antichrome_TwiXeR_992_speakers002_0
                .geometry
            }
            material={materials["TwiXeR_992_speakers.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_doorpanel_R_antichrome_TwiXeR_992_symbols005_0
                .geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_doorpanel_R_antichrome_TwiXeR_992_upper_leather004_0
                .geometry
            }
            material={materials["TwiXeR_992_upper_leather.004"]}
          />
        </group>
        <group position={[0, 74.467, -204.403]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_fascia_glass_TwiXeR_992_glass004_0.geometry
            }
            material={materials["TwiXeR_992_glass.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_fascia_glass_TwiXeR_992_antichrome002_0.geometry
            }
            material={materials["TwiXeR_992_antichrome.002"]}
          />
        </group>
        <group position={[0, 73.293, -197.654]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_fascia_mid_TwiXeR_992_chrome003_0.geometry
            }
            material={materials["TwiXeR_992_chrome.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_fascia_mid_TwiXeR_992_taillight_running001_0
                .geometry
            }
            material={materials["TwiXeR_992_taillight_running.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_fascia_mid_TwiXeR_992_brakelight_1002_0.geometry
            }
            material={materials["TwiXeR_992_brakelight_1.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_fascia_mid_TwiXeR_992_plastic_smooth001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_smooth.001"]}
          />
        </group>
        <group position={[69.722, 68.421, 161.243]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_headlight_L_led_TwiXeR_992_led_lights001_0
                .geometry
            }
            material={materials["TwiXeR_992_led_lights.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_headlight_L_led_TwiXeR_992_plastic_smooth001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_smooth.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_headlight_L_led_TwiXeR_992_headlight_1001_0
                .geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_headlight_L_led_TwiXeR_992_headlight_high001_0
                .geometry
            }
            material={materials["TwiXeR_992_headlight_high.001"]}
          />
        </group>
        <group position={[-69.722, 68.421, 161.243]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_headlight_R_led_TwiXeR_992_led_lights001_0
                .geometry
            }
            material={materials["TwiXeR_992_led_lights.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_headlight_R_led_TwiXeR_992_plastic_smooth001_0
                .geometry
            }
            material={materials["TwiXeR_992_plastic_smooth.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_headlight_R_led_TwiXeR_992_headlight_1001_0
                .geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_headlight_R_led_TwiXeR_992_headlight_high001_0
                .geometry
            }
            material={materials["TwiXeR_992_headlight_high.001"]}
          />
        </group>
        <group position={[91.094, 89.417, 24.963]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_mirror_L_TwiXeR_992_carPaint003_0.geometry
            }
            material={materials["TwiXeR_992_carPaint.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_mirror_L_TwiXeR_992_plastic_mgl002_0.geometry
            }
            material={materials["TwiXeR_992_plastic_mgl.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TwiXeR_992_mirror_L_TwiXeR_992_mirror002_0.geometry}
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
        </group>
        <group position={[-91.094, 89.417, 24.963]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_mirror_R_TwiXeR_992_carPaint003_0.geometry
            }
            material={materials["TwiXeR_992_carPaint.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TwiXeR_992_mirror_R_TwiXeR_992_mirror002_0.geometry}
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_mirror_R_TwiXeR_992_plastic_mgl002_0.geometry
            }
            material={materials["TwiXeR_992_plastic_mgl.002"]}
          />
        </group>
        <group position={[63.01, 100.032, -94.429]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_quarterglass_L_TwiXeR_992_glass004_0.geometry
            }
            material={materials["TwiXeR_992_glass.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_quarterglass_L_TwiXeR_992_glass_int001_0.geometry
            }
            material={materials["TwiXeR_992_glass_int.001"]}
          />
        </group>
        <group position={[-63.017, 100.042, -94.32]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_quarterglass_R_tint_TwiXeR_992_glass004_0
                .geometry
            }
            material={materials["TwiXeR_992_glass.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_quarterglass_R_tint_TwiXeR_992_glass_int001_0
                .geometry
            }
            material={materials["TwiXeR_992_glass_int.001"]}
          />
        </group>
        <group position={[38.186, 57.753, -29.858]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TwiXeR_992_seat_FL_TwiXeR_992_plastic004_0.geometry}
            material={materials["TwiXeR_992_plastic.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seat_FL_TwiXeR_992_ID03_stitch_001_111111FF006_0
                .geometry
            }
            material={materials["TwiXeR_992_ID03_stitch_001_111111FF.006"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seat_FL_TwiXeR_992_seat_leather004_0.geometry
            }
            material={materials["TwiXeR_992_seat_leather.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seat_FL_TwiXeR_992_seat_leather_2001_0.geometry
            }
            material={materials["TwiXeR_992_seat_leather_2.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_seat_FL_TwiXeR_992_ID05_leather_coarse_mgl_FFFFFFFF001_0
                .geometry
            }
            material={
              materials["TwiXeR_992_ID05_leather_coarse_mgl_FFFFFFFF.001"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seat_FL_TwiXeR_992_ID08_fabric_002_B60000FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_ID08_fabric_002_B60000FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seat_FL_TwiXeR_992_int_chrome007_0.geometry
            }
            material={materials["TwiXeR_992_int_chrome.007"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TwiXeR_992_seat_FL_TwiXeR_992_red002_0.geometry}
            material={materials["TwiXeR_992_gauges_9000.001"]}
          />
        </group>
        <group position={[-38.186, 57.753, -25.829]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TwiXeR_992_seat_FR_TwiXeR_992_plastic004_0.geometry}
            material={materials["TwiXeR_992_plastic.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seat_FR_TwiXeR_992_int_chrome007_0.geometry
            }
            material={materials["TwiXeR_992_int_chrome.007"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seat_FR_TwiXeR_992_ID03_stitch_001_111111FF006_0
                .geometry
            }
            material={materials["TwiXeR_992_ID03_stitch_001_111111FF.006"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seat_FR_TwiXeR_992_seat_leather004_0.geometry
            }
            material={materials["TwiXeR_992_seat_leather.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seat_FR_TwiXeR_992_seat_leather_2001_0.geometry
            }
            material={materials["TwiXeR_992_seat_leather_2.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_seat_FR_TwiXeR_992_ID05_leather_coarse_mgl_FFFFFFFF001_0
                .geometry
            }
            material={
              materials["TwiXeR_992_ID05_leather_coarse_mgl_FFFFFFFF.001"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seat_FR_TwiXeR_992_ID08_fabric_002_B60000FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_ID08_fabric_002_B60000FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seat_FR_TwiXeR_992_ID09_rubbertrim_FFFFFFFF002_0
                .geometry
            }
            material={materials["TwiXeR_992_ID09_rubbertrim_FFFFFFFF.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TwiXeR_992_seat_FR_TwiXeR_992_red002_0.geometry}
            material={materials["TwiXeR_992_gauges_9000.001"]}
          />
        </group>
        <group position={[0.032, 69.431, -99.681]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_seats_R_TwiXeR_992_ID05_leather_coarse_mgl_FFFFFFFF001_0
                .geometry
            }
            material={
              materials["TwiXeR_992_ID05_leather_coarse_mgl_FFFFFFFF.001"]
            }
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seats_R_TwiXeR_992_seat_leather004_0.geometry
            }
            material={materials["TwiXeR_992_seat_leather.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seats_R_TwiXeR_992_ID03_stitch_001_111111FF006_0
                .geometry
            }
            material={materials["TwiXeR_992_ID03_stitch_001_111111FF.006"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_seats_R_TwiXeR_992_ID08_fabric_002_B60000FF001_0
                .geometry
            }
            material={materials["TwiXeR_992_ID08_fabric_002_B60000FF.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes[
                "TwiXeR_992_seats_R_TwiXeR_992_ID06_stitch_001|rearseats_a001_0"
              ].geometry
            }
            material={materials["TwiXeR_992_gauges_9000.001"]}
          />
        </group>
        <group position={[0.047, 57.908, 19.848]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_shifter_A_TwiXeR_992_rubbertrim011_0.geometry
            }
            material={materials["TwiXeR_992_rubbertrim.011"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_shifter_A_TwiXeR_992_symbols005_0.geometry
            }
            material={materials["TwiXeR_992_headlight_1.001"]}
          />
        </group>
        <group position={[0.205, 57.242, 17.124]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_shifter_base_M_TwiXeR_992_rubbertrim011_0
                .geometry
            }
            material={materials["TwiXeR_992_rubbertrim.011"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_shifter_base_M_TwiXeR_992_ID03_stitch_001_111111FF006_0
                .geometry
            }
            material={materials["TwiXeR_992_ID03_stitch_001_111111FF.006"]}
          />
        </group>
        <group position={[0.227, 67.298, 16.456]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_shifter_knob_M_TwiXeR_992_rubbertrim011_0
                .geometry
            }
            material={materials["TwiXeR_992_rubbertrim.011"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_shifter_knob_M_TwiXeR_992_int_chrome007_0
                .geometry
            }
            material={materials["TwiXeR_992_int_chrome.007"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_shifter_knob_M_TwiXeR_992_symbols_3001_0.geometry
            }
            material={materials["TwiXeR_992_symbols_3.001"]}
          />
        </group>
        <group position={[-0.051, 105.951, 36.527]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_windshield_TwiXeR_992_glass004_0.geometry
            }
            material={materials["TwiXeR_992_glass.004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.TwiXeR_992_windshield_TwiXeR_992_glass_int001_0.geometry
            }
            material={materials["TwiXeR_992_glass_int.001"]}
          />
        </group>
        <group
          position={[79.366, 30.434, 101.399]}
          rotation={[Math.PI / 2, -0.035, Math.PI]}
          scale={[125.43, 107.645, 107.645]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.amdb11_brakedisc_FR003_amdb11_caliper002_0.geometry}
            material={materials["amdb11_caliper.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.amdb11_brakedisc_FR003_amdb11_misc_chrome002_0.geometry
            }
            material={materials["amdb11_misc_chrome.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.amdb11_brakedisc_FR003_amdb11_brake002_0.geometry}
            material={materials["amdb11_brake.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.amdb11_brakedisc_FR003_amdb11_misc002_0.geometry}
            material={materials["TwiXeR_992_metal_radiator.002"]}
          />
        </group>
        <group
          position={[90.293, 29.774, -129.264]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={120.769}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9001_TwiXeR_992_GT3RS_black_0
                .geometry
            }
            material={materials.TwiXeR_992_GT3RS_black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9001_TwiXeR_992_wheels_chrome_1_0
                .geometry
            }
            material={materials.TwiXeR_992_wheels_chrome_1}
          />
        </group>
        <group
          position={[79.366, 30.434, -144.147]}
          rotation={[Math.PI / 2, -0.035, Math.PI]}
          scale={[125.43, 107.645, 107.645]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.amdb11_brakedisc_FR001_amdb11_caliper002_0.geometry}
            material={materials["amdb11_caliper.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.amdb11_brakedisc_FR001_amdb11_misc_chrome002_0.geometry
            }
            material={materials["amdb11_misc_chrome.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.amdb11_brakedisc_FR001_amdb11_brake002_0.geometry}
            material={materials["amdb11_brake.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.amdb11_brakedisc_FR001_amdb11_misc002_0.geometry}
            material={materials["TwiXeR_992_metal_radiator.002"]}
          />
        </group>
        <group
          position={[-90.211, 29.774, 116.281]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[-120.769, 120.769, 120.769]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9002_TwiXeR_992_GT3RS_black_0
                .geometry
            }
            material={materials.TwiXeR_992_GT3RS_black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9002_TwiXeR_992_wheels_chrome_1_0
                .geometry
            }
            material={materials.TwiXeR_992_wheels_chrome_1}
          />
        </group>
        <group
          position={[-79.284, 30.434, 101.399]}
          rotation={[Math.PI / 2, 0.035, -Math.PI]}
          scale={[-125.43, 107.645, 107.645]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.amdb11_brakedisc_FR002_amdb11_caliper002_0.geometry}
            material={materials["amdb11_caliper.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.amdb11_brakedisc_FR002_amdb11_misc_chrome002_0.geometry
            }
            material={materials["amdb11_misc_chrome.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.amdb11_brakedisc_FR002_amdb11_brake002_0.geometry}
            material={materials["amdb11_brake.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.amdb11_brakedisc_FR002_amdb11_misc002_0.geometry}
            material={materials["TwiXeR_992_metal_radiator.002"]}
          />
        </group>
        <group
          position={[-90.211, 29.774, -129.264]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[-120.769, 120.769, 120.769]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9003_TwiXeR_992_GT3RS_black_0
                .geometry
            }
            material={materials.TwiXeR_992_GT3RS_black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes
                .TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9003_TwiXeR_992_wheels_chrome_1_0
                .geometry
            }
            material={materials.TwiXeR_992_wheels_chrome_1}
          />
        </group>
        <group
          position={[-79.284, 30.434, -144.147]}
          rotation={[Math.PI / 2, 0.035, -Math.PI]}
          scale={[-125.43, 107.645, 107.645]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.amdb11_brakedisc_FR004_amdb11_caliper002_0.geometry}
            material={materials["amdb11_caliper.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes.amdb11_brakedisc_FR004_amdb11_misc_chrome002_0.geometry
            }
            material={materials["amdb11_misc_chrome.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.amdb11_brakedisc_FR004_amdb11_brake002_0.geometry}
            material={materials["amdb11_brake.002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.amdb11_brakedisc_FR004_amdb11_misc002_0.geometry}
            material={materials["TwiXeR_992_metal_radiator.002"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_gt3rs_spoiler_TwiXeR_992_carPaint003_0.geometry
          }
          material={materials["TwiXeR_992_carPaint.003"]}
          position={[0, 85.229, -207.622]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_underbody_gt3rs_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.039, 51.539, -49.356]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_upperarm_R_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 42.628, -132.313]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_upperarm_F_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 45.027, 108.72]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_transaxle_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 27.453, -115.287]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_trailingarm_R_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 15.745, -100.955]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_tierod_F_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.111, 17.772, 100.252]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_swaybar_R_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.007, 27.279, -119.96]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_swaybar_F_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.009, 29.567, 107.731]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_subframe_R_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.12, 25.604, -129.34]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_subframe_F_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 26.984, 114.163]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_steeringbox_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 17.524, 99.458]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_radiator_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.002, 60.074, 115.146]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_pushrod_triangle_R_TwiXeR_992001_0.geometry
          }
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 55.051, -132.493]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_pushrod_R_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 24.402, -132.491]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_muffler_custom_TwiXeR_992_engine001_0.geometry
          }
          material={materials["TwiXeR_992_engine.001"]}
          position={[0.003, 26.044, -187.464]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_lowerarm_R_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 15.726, -131.951]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_lowerarm_F_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 18.049, 121.629]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_intake_TT_TwiXeR_992_engine001_0.geometry}
          material={materials["TwiXeR_992_engine.001"]}
          position={[0.003, 52.991, -127.213]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_hub_R_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 26.603, -130.458]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_hub_F_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 30.262, 114.009]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_heatshield_TwiXeR_992_engine001_0.geometry}
          material={materials["TwiXeR_992_engine.001"]}
          position={[0, 29.35, -157.48]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_halfshaft_R_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 26.248, -129.162]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_halfshaft_F_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 28.348, 115.936]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_halfshaft_e_R_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.001, 27.574, -129.162]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_halfshaft_e_F_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.001, 29.461, 115.936]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_fueltank_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 52.311, 110.853]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_fuellines_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[-15.381, 22.268, -14.013]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_driveshaft_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 25.198, 47.864]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_diff_F_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 25.198, 112.331]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_coolantlines_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 23.109, -18.369]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_coilover_RR_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[-19.661, 57.643, -132.503]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_coilover_RL_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[19.666, 57.643, -132.503]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_coilover_F_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0.003, 35.499, 124.306]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_bumperbar_R_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0, 45.496, -212.373]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_bumperbar_F_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0, 41.325, 196.831]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_brakelines_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[26.949, 27.604, -5.897]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_muffler_TwiXeR_992_engine001_0.geometry}
          material={materials["TwiXeR_992_engine.001"]}
          position={[0, 27.252, -193.996]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_exhaust_TT_TwiXeR_992_engine001_0.geometry}
          material={materials["TwiXeR_992_engine.001"]}
          position={[0, 32.127, -171.445]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_exhaust_TwiXeR_992_engine001_0.geometry}
          material={materials["TwiXeR_992_engine.001"]}
          position={[0, 22.934, -167.271]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_engine_TwiXeR_992_engine001_0.geometry}
          material={materials["TwiXeR_992_engine.001"]}
          position={[-1.817, 41.166, -169.684]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_radiators_small_TwiXeR_992001_0.geometry}
          material={materials["TwiXeR_992.001"]}
          position={[0, 32.716, 181.458]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes[
              "TwiXeR_992_black_dash_accessories_TwiXeR_992_ID05_leather_coarse_mgl|shifterassy_a_2002_0"
            ].geometry
          }
          material={
            materials["TwiXeR_992_ID05_leather_coarse_mglshifterassy_a_2.002"]
          }
          position={[-0.019, 73.873, 32.986]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_body002_TwiXeR_992_rubbertrim011_0.geometry
          }
          material={materials["TwiXeR_992_rubbertrim.011"]}
          position={[4.295, 82.434, -189.459]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_body_chrome_end_TwiXeR_992_chrome003_0.geometry
          }
          material={materials["TwiXeR_992_chrome.003"]}
          position={[0, 105.161, -60.859]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes[
              "TwiXeR_992_chrome_dash_accessories_TwiXeR_992_ID05_leather_coarse_mgl|shifterassy_a003_0"
            ].geometry
          }
          material={materials["TwiXeR_992_headlight_1.001"]}
          position={[-0.019, 73.873, 32.986]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_door_L_antichrome_end_TwiXeR_992_chrome003_0
              .geometry
          }
          material={materials["TwiXeR_992_chrome.003"]}
          position={[73.717, 87.328, -11.189]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_door_L_chrome_end_TwiXeR_992_chrome003_0.geometry
          }
          material={materials["TwiXeR_992_chrome.003"]}
          position={[73.717, 87.328, -11.189]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_door_R_antichrome_end_TwiXeR_992_chrome003_0
              .geometry
          }
          material={materials["TwiXeR_992_chrome.003"]}
          position={[-73.71, 87.328, -11.189]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_door_R_chrome_end_TwiXeR_992_chrome003_0.geometry
          }
          material={materials["TwiXeR_992_chrome.003"]}
          position={[-73.71, 87.328, -11.189]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_gauges_screen_TwiXeR_992_gauges_screen001_0
              .geometry
          }
          material={materials["TwiXeR_992_gauges_screen.001"]}
          position={[33.846, 79.727, 36.68]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_headlightglass_L_led_TwiXeR_992_glass004_0.geometry
          }
          material={materials["TwiXeR_992_glass.004"]}
          position={[69.011, 67.903, 168.028]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_headlightglass_R_led_TwiXeR_992_glass004_0.geometry
          }
          material={materials["TwiXeR_992_glass.004"]}
          position={[-69.008, 67.903, 168.028]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes.TwiXeR_992_shifter_boot_M_TwiXeR_992_rubbertrim011_0.geometry
          }
          material={materials["TwiXeR_992_rubbertrim.011"]}
          position={[0.288, 59.831, 16.958]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TwiXeR_992_body005_TwiXeR_992_carPaint008_0.geometry}
          material={materials["TwiXeR_992_carPaint.008"]}
          position={[0, 99.671, -99.187]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Object_4003_Scene_-_Root002_0"].geometry}
          material={materials["Scene_-_Root.002"]}
          position={[77.007, 30.461, 116.88]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[141.422, 116.115, 116.115]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Object_4001_Scene_-_Root002_0"].geometry}
          material={materials["Scene_-_Root.002"]}
          position={[77.007, 30.461, -128.666]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[141.422, 116.115, 116.115]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Object_4002_Scene_-_Root002_0"].geometry}
          material={materials["Scene_-_Root.002"]}
          position={[-76.925, 30.461, 116.88]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[-141.422, 116.115, 116.115]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Object_4004_Scene_-_Root002_0"].geometry}
          material={materials["Scene_-_Root.002"]}
          position={[-76.925, 30.461, -128.666]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[-141.422, 116.115, 116.115]}
        />
      </group>
    </a.group>
  );
};

export default PorscheGT3;
