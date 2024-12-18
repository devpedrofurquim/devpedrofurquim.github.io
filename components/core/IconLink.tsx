import React from 'react'
import Link from 'next/link'
import Arrow from '../icons/ArrowIcon';

type LinkType = {
    label: string;
    href?: string;
}

function IconLink({ label, href }: LinkType) {
    let link = "";
    if (label.includes("Youtube")) {
        link = "https://www.youtube.com/@pedro_furquim";
    } else if (label.includes("Linkedin")) {
        link = "https://www.linkedin.com/in/pedro-furquim/";
    } else if (label.includes("Github")) {
        link = "https://github.com/devpedrofurquim"
    } else if (href) {
        link = href;
    }
    return (
        <Link href={link} >
            < a >
                <div className='flex items-center space-x-1 hover:underline'>
                    <span>
                        { label }
                    </span>
                    <Arrow/>
                </div>
            </ a>
        </Link >

    )
}

export default IconLink