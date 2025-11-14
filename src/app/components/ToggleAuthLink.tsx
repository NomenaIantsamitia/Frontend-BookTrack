interface ToggleAuthLinkProps {
    isLogin: boolean;
    setIsLogin: (val: boolean) => void;
    setMessage: (msg: string) => void;
    setStep: (val: number) => void;
  }
  
  export default function ToggleAuthLink({
    isLogin,
    setIsLogin,
    setMessage,
    setStep,
  }: ToggleAuthLinkProps) {
    return (
      <div className="text-center text-sm">
        {isLogin ? (
          <p className="text-gray-600 dark:text-gray-400">
            Nouveau sur BookTrack ?
            <button
              onClick={() => {
                setIsLogin(false);
                setStep(1);
                setMessage("");
              }}
              className="ml-1 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Créez un compte
            </button>
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Vous avez déjà un compte ?
            <button
              onClick={() => {
                setIsLogin(true);
                setMessage("");
              }}
              className="ml-1 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Connectez-vous
            </button>
          </p>
        )}
      </div>
    );
  }
  