import './Event.css'

export default function Event({image, title, description}) {
  return (  
  <li>
    <img src={image} alt={title} className="medallion-image" />
    <h2>{title}</h2>
    <p>{description}</p>
  </li>
  )
}