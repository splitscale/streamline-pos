import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserSignInForm } from "~/components/form/UserSignInForm";
import { SignUpForm } from "~/components/form/signUpForm";
import { Button } from "~/components/ui/button";

export default function Home() {
  const [signUpMode, setSignUpMode] = useState(false); // Set to false to show sign-in form first
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionData) router.push("/mobile");
  }, [sessionData, router]);

  return (
    <>
      <Head>
        <title>Streamline</title>
        <meta name="description" content="Streamline your business" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-primary">
        {signUpMode ? <SignUpForm /> : <UserSignInForm />}
        <div>
          <ToggleAuthModeButton
            signUpMode={signUpMode}
            setSignUpMode={setSignUpMode}
          />
        </div>
      </main>
    </>
  );
}

function ToggleAuthModeButton({
  signUpMode,
  setSignUpMode,
}: {
  signUpMode: boolean;
  setSignUpMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const buttonText = signUpMode
    ? "Already have an account?"
    : "Create an account";

  return (
    <Button
      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
      variant={"link"}
      onClick={() => setSignUpMode((prevMode) => !prevMode)}
    >
      {buttonText}
    </Button>
  );
}
