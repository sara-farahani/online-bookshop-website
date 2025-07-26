import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export type FormType = "signUp" | "logIn";

export default function Form({
  formType,
  title,
  onSubmit,
  error,
}: {
  formType: FormType;
  title: string;
  onSubmit?: (formData: FormData) => Promise<void>;
  error?: string;
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      const form = new FormData();
      form.append("email", formData.email);
      form.append("password", formData.password);
      if (formType === "signUp") {
        form.append("confirmPassword", formData.confirmPassword);
      }
      await onSubmit(form);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold">{title}</h2>
            <input
              type="email"
              name="email"
              placeholder="ایمیل"
              onChange={handleChange}
              required
              className="border-none bg-purple-100 text-left rounded-md px-4 py-2"
            />
            <input
              type="password"
              name="password"
              placeholder="پسورد"
              onChange={handleChange}
              required
              className="border-none bg-purple-100 text-left rounded-md px-4 py-2"
            />
            {formType === "signUp" && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="تکرار پسورد"
                onChange={handleChange}
                required
                className="border-none bg-purple-100 text-left rounded-md px-4 py-2"
              />
            )}
            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
            >
              {formType === "logIn" ? "ورود" : "ثبت‌نام"}
            </button>
            <Link to={formType === "logIn" ? "/signup" : "/login"}>
              <span className="hover:underline hover:text-purple-700">
                {formType === "logIn"
                  ? "حساب کاربری ندارید؟ ثبت‌نام"
                  : "حساب کاربری دارید؟ ورود"}
              </span>
            </Link>
          </form>
          <div className="hidden md:block">
            <Canvas
              camera={{ position: [1, 3, 2], fov: 45 }}
              onCreated={({ camera }) => {
                camera.lookAt(2, 4, 6);
              }}
            >
              <ambientLight intensity={0.7} />
              <directionalLight position={[2, 2, 2]} />
              <AnimatedModel />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        </div>
      </main>
    </div>
  );
}

function AnimatedModel() {
  const group = useRef();
  // The 3d model was downloaded from
  // sketchfab:
  // "https://sketchfab.com/3d-models/book-animated-book-historical-book-097f8683aa5d4c9da1530d6119c20ac3"
  const { scene, animations } = useGLTF(
    "src/assets/3dModels/book_animated_book__historical_book.glb"
  );
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[0]];

      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();

      const mixer = action.getMixer();
      const handleFinished = () => {
        if (group.current) {
          group.current.rotation.y += Math.PI / 6;
        }
      };
      mixer.addEventListener("finished", handleFinished);

      return () => {
        mixer.removeEventListener("finished", handleFinished);
      };
    }
  }, [actions]);

  return (
    <group
      ref={group}
      scale={[0.5, 0.5, 0.5]}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    >
      <primitive object={scene} />
    </group>
  );
}
