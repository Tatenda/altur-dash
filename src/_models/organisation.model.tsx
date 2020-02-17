import slugify from "react-slugify";

export interface IOrganisation {
    id: string,
    title: string,
    subtitle: string,
    slug: string,
    image: string,
    description: string,
    credits: number,
    created_at: string,
    updated_at: string
}

export class CreateOrganisation {
    title: string;
    subtitle: string;
    slug: string;
    description: string;
    number: string;
    image: string;
    credits: number;

    constructor(model: any) {
        this.title = model && model.title;
        this.subtitle = model && model.subtitle;
        this.slug = model && slugify(model.title);
        this.description = model && model.subscription;
        this.number = model && model.number;
        this.image = model && model.image;
        this.credits = 0;
    }
}