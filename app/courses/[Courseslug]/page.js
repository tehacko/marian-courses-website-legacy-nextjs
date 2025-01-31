export default function CoursePage( { params } ) {
    return (
        <>
            <header>
                <h1>Course Page</h1>
            </header>
            <main>
                <h1>{params.slug} Page</h1>
            </main>
        </>
    );
}