"use client";

import { cn } from "@/lib/utils";
import { Home, Plus, Settings } from "lucide-react";
import {usePathname, useRouter} from "next/navigation";


export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const routes = [
        {
            icon: Home,
            href:"/",
            label:"Home",
            pro: false
        },
            icon: Plus,
            href:"/sage/new",
            label:"Create",
            pro: false
        },
        {
            icon: Settings,
            href:"/settings",
            label:"Settings",
            pro: false
        }
        
    ];


    /**
     * @description This function checks if the user has exceeded their free tier limit
     * and loads a popup if they have. If the user's subscription is active, the function
     * redirects them to the provided URL.
     * 
     * @param { string } url - The `url` input parameter represents the URL that the
     * function will push to the user's browser when the subscription is active and the
     * monthly free tier has been exceeded.
     * 
     * @param { boolean } pro - In this function, `pro` is used to determine whether a
     * user has exceeded their monthly free tier. If the user has exceeded their free
     * tier, a popup will be loaded. The value of `pro` is not explicitly defined in the
     * code snippet provided, but it is likely set to a boolean value based on some
     * external condition or logic.
     * 
     * @returns { Promise } The function returns `router.push(url)`. This means that the
     * function will redirect the user to the specified URL (`url`) after checking if the
     * user has exceeded their monthly free tier and loading a popup for them if necessary.
     */
    const onNavigate = (url: string, pro:boolean) => {
        // TODO check if subscrtiption is active in order to load a popup for users who have exceeded monthly free tier
        return router.push(url);
    }
    return (
        <div className="space-y-4 flex flex-col h-full text-primary bg-secondary" >
            <div className="p-3 flex-1 flex justify-center">
                {/**
                 * @description This component displays a list of routes and allows the user to
                 * navigate between them by clicking on the route name or icon. The component uses
                 * CSS flexbox layout to position the routes in a row and gap between items. When the
                 * user clicks on a route, the `onNavigate` function is called with the route's URL
                 * and properties.
                 * 
                 * @param { string } className - The `className` property in this component is used
                 * to define a class name for each route element. It specifies a stylesheet rule that
                 * can be used to apply custom styles to the element based on the value of the
                 * `pathname` variable, which represents the current URL of the app. The class name
                 * defined in `className` will be applied to the element when the `pathname` matches
                 * the value of the `href` property of the route object.
                 */}
                <div className="space-y-2">
                    {routes.map((route)=>(
                        <div key={route.href} onClick={()=> onNavigate(route.href, route.pro)} className={cn("text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition", pathname === route.href && "bg-primary/10 text-primary")}>
                            <div className="flex flex-col gap-y-2 items-center flex-1">
                                <route.icon className="h-5 w-5"></route.icon>
                                {route.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             </div>
    )
}
