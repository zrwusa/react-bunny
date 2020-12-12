import React from "react";

type IProps = {title: string,paragraph?: string,}

const FCCard: React.FunctionComponent<IProps> = ({title, paragraph, children})=>{
    return(<aside>
        <h1 className={"demo-home__title--des"}>{title}</h1>
        <p>
            {paragraph}
        </p>
        {/*// we can use children even though we haven't defined them in our FCCardProps*/}
        {children}
    </aside>);
}
export default FCCard
