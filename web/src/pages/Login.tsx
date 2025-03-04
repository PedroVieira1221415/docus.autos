import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { hankoApi, hankoInstance } from "@/lib/hanko";
import { register } from "@teamhanko/hanko-elements";

export function LoginPage() {
  const router = useNavigate();

  const hanko = useMemo(() => hankoInstance, []);

  const handleAuthFlowCompleted = async () => {
    console.log("Auth flow completed");
    const user = await hanko.user.getCurrent();
    console.log(user);
    router("/apps");
  };

  useEffect(
    () =>
      hanko.onAuthFlowCompleted(() => {
        handleAuthFlowCompleted();
      }),
    [hanko]
  );

  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex flex-1 flex-col justify-center gap-20 items-center">
        <h1 className="font-bold text-5xl text-center">Start working faster</h1>
        <hanko-auth />
      </section>
    </div>
  );
}
