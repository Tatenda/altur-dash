import slugify from "react-slugify";

export interface ICategory {
    id: string,
    title: string,
    subtitle: string,
    description: string,
    slug: string;
}

export class CreateCategory {
    title: string;
    subtitle: string;
    description: string;
    slug: string;

    constructor(model: any) {
        this.title = model && model.title;
        this.subtitle = model && model.subtitle;
        this.description = model && model.description;
        this.slug = model && slugify(model.title);
    }
}