import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Clothe Customize",
    url: "https://project-with-threejs.vercel.app/",
    image: "projects/clothe.jpg",
    description: "I learned a lot about threejs in this customizable project.",
  },
  {
    title: "Food Site",
    url: "https://functionalportfolio2.vercel.app/",
    image: "projects/food.jpg",
    description: "You can buy everything online using this site.",
  },
  {
    title: "Youtube Clone",
    url: "https://youtube-clone-iota-kohl.vercel.app/",
    image: "projects/youtube.jpg",
    description: "I recreated youtube clone with the help of youtubeapi.",
  },
  {
    title: "Relaxan Tilda",
    url: "https://relaxan-tilda.vercel.app/",
    image: "projects/drug.jpg",
    description: "A site where you can buy lots of treatments",
  },
  {
    title: "My Portfolio",
    url: "https://my-first-portfolio-website.vercel.app/",
    image: "projects/portfolio.jpg",
    description: "My first project create using Vite.",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[3, 2.3]} />
        <meshBasicMaterial color="#F5EFE6" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2.9, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.5}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        color={"black"}
        position={[-1.2, -0.3, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        color={"black"}
        position={[-1.2, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
