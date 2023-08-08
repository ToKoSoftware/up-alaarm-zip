export default function IntroScreen(props: { title: string, description: string }) {
    return (
        <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{props.title}</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    {props.description}
                </p>
            </div>
        </div>
    );
}