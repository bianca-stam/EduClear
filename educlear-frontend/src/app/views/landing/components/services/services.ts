import {Component} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {RouterLink} from '@angular/router';

type ServiceType = {
    name: string,
    description: string,
    icon: string
}

@Component({
    selector: 'app-services',
    imports: [NgIcon, RouterLink],
    templateUrl: './services.html',
    styles: ``
})
export class Services {


    services: ServiceType[] = [
        {
            name: "Strategic Consulting",
            description: "We help businesses define clear digital goals and create custom strategies that align with long-term success. From planning to execution.",
            icon: "tablerBulb",
        },
        {
            name: "SEO & Traffic Growth",
            description: "Boost your search visibility and drive organic traffic with our comprehensive SEO services — including keyword strategy, technical audits, etc.",
            icon: "tablerChartBar",
        },
        {
            name: "Social Media Management",
            description: "Elevate your brand's presence with targeted content, community engagement, and performance analytics across platforms like Instagram, Facebook, etc.",
            icon: "tablerSpeakerphone",
        },
        {
            name: "Custom Web Development",
            description: "We build modern, scalable websites and applications tailored to your business needs — optimized for speed, mobile responsiveness.",
            icon: "tablerWorld",
        },
        {
            name: "Brand Identity & Design",
            description: "From logos to full brand systems, we create memorable visual identities that express your values and connect with your target audience.",
            icon: "tablerBrush",
        },
        {
            name: "Analytics & Insights",
            description: "Turn data into decisions with real-time dashboards, performance reports, and analytics solutions that help you measure success.",
            icon: "tablerReportAnalytics",
        },
    ];
}
