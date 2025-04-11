import { Card } from "@/components/card";


export default function HomePage() {
    return (
        <>
            <div className="bg-primary-container rounded-lg m-3 p-2 text-wrap text-on-primary-container">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in feugiat enim, eget bibendum dui. Quisque blandit aliquet odio, sit amet porta justo ultrices id. Ut tempus
                sit amet erat eget varius. Duis ullamcorper suscipit nunc, at varius orci eleifend eget. Aliquam vestibulum, metus eget finibus aliquam, nulla ipsum auctor sapien, sit amet commodo nisl massa non
                sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis porttitor pharetra magna, at varius orci auctor hendrerit. Cras sit amet commodo tellus.
                Donec felis est, mollis faucibus nibh et, accumsan porttitor nibh. Quisque in mollis quam. Ut hendrerit congue nulla in laoreet. Phasellus fermentum eu diam ut consectetur.

                Maecenas fermentum odio felis, sit amet facilisis nunc vulputate at. Quisque egestas non quam quis dapibus. Praesent interdum lorem vel maximus pharetra. Mauris erat est, venenatis a leo
                vitae, posuere pharetra elit. Suspendisse cursus fringilla est, eget lobortis odio eleifend vitae. Maecenas pulvinar semper sollicitudin. Suspendisse bibendum elit tortor, non molestie est commodo ac. Nam
                ultrices eleifend tempus. Nullam suscipit, felis vel volutpat blandit, turpis massa consectetur magna, sed feugiat urna ipsum eget nulla. Suspendisse aliquam purus non orci rhoncus, ut mattis
                ante commodo. Vivamus facilisis posuere ultrices. Sed tempus porta dui quis imperdiet. Suspendisse finibus fringilla dolor, id pellentesque ligula imperdiet lacinia. Donec sit amet
                arcu ac ipsum vehicula sollicitudin vestibulum ac justo.
            </div>
            <div className="flex flex-row items-center justify-center">
                <Card elevated title="installations" price={0} tags={['installation']} >
                    you can shedule an installation with us just to go the booking page
                </Card>
                <Card elevated title="consulations" price={0} tags={["consulation"]} >
                    you can also book consulations to ensure your ready
                </Card>
                <Card elevated title="products" price={0} tags={["products"]} >
                    you can also see products that we at Rosla use outselves
                </Card>
            </div>
        </>


    )
}