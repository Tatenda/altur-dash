
import slugify from 'react-slugify';
export class CompanyCreateModel {
    title: string;
    subtitle: string;
    slug: string;
    description: string;
    keywords: string[];
    chatbot: string;
    category: string;
    province: string;
    email: string;
    website: string;
    address: string;
    city: string;
    user: string;

    constructor(model: any) {
        this.title = model && model.title;
        this.subtitle = model && model.subtitle;
        this.slug = model && slugify(model.title);
        this.description = model && model.description;
        this.keywords = model && model.keywords;
        this.chatbot = model && model.chatbot;
        this.category = model && model.category;
        this.province = model && model.province;
        this.email = model && model.email;
        this.website = model && model.website;
        this.address = model && model.address;
        this.city = model && model.city;
        this.user = model && model.user;
    }
}

export interface ICompanyModel {
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    description: string;
    keywords: string[];
    chatbot: string;
    category: string;
    province: string;
    closing_date: string;
    email: string;
    website: string;
    address: string;
    city: string;
    created_at: string;
}