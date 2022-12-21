import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

import { Canvas } from "@react-three/fiber";
import Player from "~/components/Player";
import Box from "~/components/Box";
import useIsHydrated from "~/hooks/useIsHydrated";

const components = {
  Box,
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const gameObjects: { id: string; component: keyof typeof components }[] = [
    {
      id: "box1",
      component: "Box",
    },
    {
      id: "box2",
      component: "Box",
    },
  ];
  return json({ userId, gameObjects });
}

export default function Game() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();
  const isHydrated = useIsHydrated();

  return (
    <main className="flex h-full min-h-screen flex-col">
      {isHydrated && 
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Player />
        {data.gameObjects.map(({ id, component }) => {
          const Component = components[component];
          return <Component key={id} id={id} />;
        })}
      </Canvas>}
    </main>
  );
}
