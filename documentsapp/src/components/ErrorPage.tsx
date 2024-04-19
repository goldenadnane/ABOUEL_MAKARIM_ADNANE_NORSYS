import React from "react";
import ImgLogo from "../assets/images/NorsysAfriqueTest.png";

const ErrorPage = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
            <div className="max-w-lg mx-auto space-y-3 text-center">
                <img src={ImgLogo} alt={"logo"} width={150} className="mx-auto"/>
                <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
                    404 : Page non trouvée
                </p>
                <p className="text-gray-600">
                    Désolé, la page que vous recherchez est introuvable.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <a href="/"
                       className="block py-2 px-4 text-white font-medium bg-blue-600 duration-150 hover:bg-blue-500 active:bg-blue-700 rounded-lg">
                        Retour à la page d'accueil
                    </a>
                    <a href="/"
                       className="block py-2 px-4 text-gray-700 hover:bg-gray-50 font-medium duration-150 active:bg-gray-100 border rounded-lg">
                        Nous contacter
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;

