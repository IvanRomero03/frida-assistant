import DocCard from "./docCard"


const DocGrid = () => {
    const cards = [{ title: "Wikialgo", summary: "resumen de un pagina no se que bla ba bla", id: "12345678" }, { title: "Estudio de algo", summary: "erjknl aerlkjn ejf aier f", id: "12345" }]

    return (
        <div className=" grid gap-5 mt-8 w-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-scroll">
            {cards.map((card, key) => (
                <DocCard key={key} {...card} />
            ))}
        </div>
    )
}

export default DocGrid