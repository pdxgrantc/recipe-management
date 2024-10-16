import React from "react";

// Firebase
import { SignIn } from "../firebase";

// Photos
import google_normal from './photos/btn_google_signin_dark_normal_web@2x.png'
import google_pressed from "./photos/btn_google_signin_dark_pressed_web@2x.png";1

export default function SignInDialogue() {
    const GoogleButton = () => {
        const handleMouseEnter = (event) => {
            // Change the source of the image to the second image
            event.target.src = google_pressed;
        };

        const handleMouseLeave = (event) => {
            // Change the source of the image back to the first image
            event.target.src = google_normal;
        };

        return (
            <button className="mx-auto transition rounded" onClick={SignIn}>
                <img
                    src={google_normal}
                    alt="Button"
                    className="h-[5rem]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            </button>
        );
    };

    return (
        <div className="my-auto">
            <div className="center flex flex-col gap-5 h-fit w-fit mx-auto">
                <div className="flex flex-col gap-2 w-fit">
                    <h1 className="text-center text-5xl font-bold">
                        Welcome to Ez Recipe
                    </h1>
                    <p className="text-center text-2xl">
                        Please sign in with Google to continue
                    </p>
                </div>
                <div className="font-semibold mx-auto w-fit">
                    <GoogleButton />
                </div>
            </div>
        </div>
    );
}
