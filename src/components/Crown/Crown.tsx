import React from "react"

interface ICrown {
    width: number;
    height: number;
    fill: string;
}

const Crown: React.FC<ICrown> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1280 815"
        {...props}
    >
        <path d="M622.4 1.9c-13.7 3.7-20.2 8.3-33.1 22.9-13.9 15.9-19 31-17.9 52.7.9 18.4 6.2 31.6 18.5 46.1 3.8 4.4 9.1 9.7 11.8 11.7 5.5 4 16.9 9.7 19.5 9.7.9 0 1.9.4 2.2.9 1 1.6-74.3 261-77.9 268.6-4.8 10-8.8 15-14.1 17.6-4.1 1.9-5 2-8.6 1-5.5-1.7-12.4-8.8-18.5-19.1-2.7-4.7-34.3-46.5-70.2-92.9l-65.2-84.5 4.6-3.9C394.4 214.8 405 194 405 171c0-17.2-4.7-30.3-15.9-44.2-13.2-16.4-23.8-24-38.9-27.9-13.3-3.4-26.3-1.8-40.2 4.9-5.8 2.8-9.3 5.5-15.9 12.2-13.6 13.9-20.9 25.6-24.2 39-1.7 7.1-1.7 24.9 0 32 1.9 7.7 8.1 20.7 13.2 27.6 11.6 15.8 25 25.4 40.4 29.1 3.9.9 7.1 1.7 7.2 1.8.3.2-19.4 196.4-20.3 202-1.2 7.4-5.4 19.2-8.4 23.3-7.5 10.4-17.8 9.7-33.5-2.3-3.8-2.9-38.5-25.9-77-51s-70.6-46.3-71.3-47c-1.1-1-.8-2.1 2.2-6.3 14.2-19.7 17.5-49.8 7.9-72.6-8.3-19.9-27.4-37.4-46.8-43.2-7.3-2.1-21.7-2.4-29.5-.5-3 .7-9.3 3.1-14 5.3-7.1 3.5-10 5.6-18 13.7-7.4 7.4-10.5 11.5-13.7 17.6C1.5 297.6.5 302.3.5 320c0 13.5.3 16.5 2.4 23 9.8 31.4 35.4 51.3 66.1 51.3 10.9.1 17.1-1.5 26.8-6.8 3.5-2 6.5-3.5 6.7-3.3.5.7 27.5 51.6 38.3 72.3 32.7 62.9 48.1 107.1 56.2 161 .6 3.8 1.3 8.2 1.6 9.8l.6 2.7h879.5l.7-5.2c1.2-9.5 7.6-40 11.2-53.5 7.7-29.4 20.1-61.1 37.4-96.2 10.3-20.9 45.8-89 47.1-90.5.4-.5 2.1.1 3.7 1.3 8 5.6 24.4 9.8 34.6 8.7 17.4-2 30.2-8.1 42.6-20.6 4.7-4.7 10-11.1 11.9-14.2 19.7-33.6 12.9-72.5-17.2-97.8-7.7-6.5-18.3-12.1-26.7-14.1-7.1-1.7-20-1.7-27 0-12.7 3.1-27.8 13.1-37.5 24.9-12.4 15-17.2 29.8-16.2 50.4.7 16.3 5.2 30.1 13.4 41.6 2.5 3.6 3 4.9 2 5.8-.6.6-33 21.8-71.8 47.1-38.8 25.4-73.7 48.5-77.5 51.4-8.9 6.7-13.7 8.9-20 8.9-9.4 0-15.7-6.9-19.4-21.4-1.4-5.7-4.8-37.1-11.5-108.9-5.2-55.5-9.5-101.3-9.5-101.8s.7-.9 1.4-.9c3.8 0 17.9-5.4 23.3-8.9 11.8-7.6 24.6-23.1 29.9-36.3 6.9-16.8 7.2-39.5.7-55.8-3.9-9.8-8.7-16.5-19.3-27.1-10.7-10.7-18.8-15.5-31.5-18.5-13.5-3.1-29.9-.2-43.2 7.8-7 4.2-20.2 17.4-25.8 25.8-14.7 22.3-14.6 56.3.4 79.2 4.9 7.6 13.7 17.1 20.6 22.5l4 3-3.1 3.9c-28.8 36.5-129.2 168.1-132.9 174.3-5.6 9.3-13.8 17.5-18.5 18.4-7.7 1.6-15.8-6-21.6-20.3-1.2-3-7.6-24-14.2-46.5-6.6-22.6-23.8-81-38.2-130-14.3-48.9-25.8-89.5-25.6-90.2.3-.7 1.2-1.3 2-1.3.7 0 5.1-1.8 9.6-4.1 10-5 23.7-18 29.4-27.9 11.6-19.9 13.9-46.7 5.9-67-7.4-18.8-26.3-37.7-43.2-43.1-9.6-3.1-27.1-3.6-36.7-1zM199 749v66h879l.2-66 .3-66H199v66z" />
    </svg>
)

export default Crown;