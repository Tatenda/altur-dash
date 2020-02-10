import slugify from "react-slugify";

export interface IChartBot {
    id: string,
    title: string,
    subtitle: string,
    slug: string,
    description: string,
    number: string,
    created_at: string,
    updated_at: string
}

export class CreateChatBot {
    title: string;
    subtitle: string;
    slug: string;
    description: string;
    number: string;

    constructor(model: any) {
        this.title = model && model.title;
        this.subtitle = model && model.subtitle;
        this.slug = model && slugify(model.title);
        this.description = model && model.subscription;
        this.number = model && model.number;
    }
}