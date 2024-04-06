import axios from "axios";

export interface IResolutions {
    id: string;
    name: string;
    progress: number;
    date: {
        start: string;
        end: string;
    };
    desc: string;
}
export interface IYears {
    id: string;
    label: string;
    data: Array<IResolutions>;
}
export interface IYearsResolutions {
    head: string;
    id: string;
    data: Array<IYears>;
}
export interface InfoData {
    email: string;
    imgUrl: string;
    address: string;
    city: string;
    country: string;
    firstName: string;
    jobTitle: string;
    lastName: string;
    nationality: string;
    phone: string;
    placeOfBirth: string;
    dateOfBirth: string;
    postalCode: string;
    availability: string;
    cv: string;
}
export interface IInfo {
    head: string;
    data: InfoData;
}
export interface ILink {
    id: string;
    label: string;
    link: string;
}
export interface ILinks {
    head: string;
    data: Array<ILink>;
}

export interface IServerResponse<T> {
    state: true;
    msg: string;
    data: T;
}
export const instance = axios.create({
    baseURL: "https://cv-builder-tobe.onrender.com/api/v1/data",
    params: {
        apikey: process.env.API_KEY,
    },
});

export async function getData(year: string) {
    const yearsResolutions = await instance.get<
        IServerResponse<IYearsResolutions>
    >("/year_resolution/");
    const resolutions =
        yearsResolutions.data.data.data.find(
            ({ label }) => label == year.toString()
        )?.data || [];
    const info = await instance.get<IServerResponse<IInfo>>("/info/");
    const links = await instance.get<IServerResponse<ILinks>>("/links/");
    return {
        resolutions,
        info: info.data.data.data,
        links: links.data.data.data,
    };
}
