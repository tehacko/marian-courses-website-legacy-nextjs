// 'use client';
// import { useState } from 'react';
import classes from './page.module.css';
import ImagePicker from '@/components/Courses/ImagePicker';

export default function CreateACourse() {

    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle form submission logic here
    //     console.log('Course Created:', { title, description });
    // };

    return (
      <>
        <header className={classes.header}>
            <h1>
            Vytvoření <span className={classes.highlight}>nového kurzu</span>
            </h1>
            <p>Zkontroluj si prosím správnost veškerého textu v textovém editoru a přílušné kusy zkopíruj do přílušných políček. Následně zkontroluj, že vše je ve správném políčku. Až poté odešli. Kurz poté najdeš v nabídce kurzů.</p>
        </header>
        <main className={classes.main}>
            <form className={classes.form}>
            <div className={classes.row}>
                <p>
                    <label htmlFor="name">Jméno přednášejícího</label>
                <input type="text" id="name" name="name" required />
                </p>
                <p>
                <label htmlFor="email">Email přednášejícího</label>
                <input type="email" id="email" name="email" required />
                </p>
            </div>
            <p>
                <label htmlFor="title">Název</label>
                <input type="text" id="title" name="title" required />
            </p>
            <p>
                <label htmlFor="summary">Abstrakt</label>
                <input type="text" id="summary" name="summary" required />
            </p>
            <p>
                <label htmlFor="instructions">Popis kurzu</label>
                    <textarea
                    id="instructions"
                    name="instructions"
                    rows="10"
                    required
                    ></textarea>
            </p>
            <ImagePicker />
            <p className={classes.actions}>
                <button type="submit">Share Meal</button>
            </p>
            </form>
        </main>
      </>
    );
}

// export default function CreateCourse() {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission logic here
//         console.log('Course Created:', { title, description });
//     };

//     return (
//         <div>
//             <h1>Create a New Course</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="title">Course Title:</label>
//                     <input
//                         type="text"
//                         id="title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="description">Course Description:</label>
//                     <textarea
//                         id="description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Create Course</button>
//             </form>
//         </div>
//     );
// }