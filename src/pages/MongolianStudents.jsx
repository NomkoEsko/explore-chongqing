import { ExternalLink, GraduationCap, Images, UsersRound } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import { mongolianAssociation } from "../data/aboutChongqing.js";
import { studentActivities } from "../data/studentActivities.js";
import { IS } from "../data/universities.js";

function ActivityImages({ activity }) {
  if (!activity.images.length) {
    return (
      <div className="student-activity-placeholder" role="img" aria-label={`${activity.title} зураг удахгүй нэмэгдэнэ`}>
        <Images size={24} aria-hidden="true" />
        <span>Зураг удахгүй нэмэгдэнэ</span>
      </div>
    );
  }

  return (
    <div className="student-activity-images">
      {activity.images.map((image, index) => (
        <img key={image} src={image} alt={`${activity.title} зураг ${index + 1}`} loading="lazy" />
      ))}
    </div>
  );
}

export default function MongolianStudents() {
  return (
    <main>
      <PageHero
        eyebrow="Оюутны холбоо"
        title="Чунчин дахь Оюутны холбоо"
        image={IS[0].image}
        imagePosition={IS[0].imagePosition}
        label="Монгол Монгол оюутнууд"
      >
      </PageHero>

      <section className="section students-section">
        <div className="container detail-grid">
          <article className="content-panel student-feature">
            <UsersRound size={28} aria-hidden="true" />
            <h2>{mongolianAssociation.title}</h2>
            <p>{mongolianAssociation.text}</p>
          </article>

          <div className="student-future-grid student-activities-grid">
            <div className="student-activities-heading">
              <GraduationCap size={22} aria-hidden="true" />
              <h2>Үйл ажиллагаа</h2>
            </div>

            {studentActivities.map((activity) => (
              <article className="about-card student-activity-card" key={activity.id}>
                <ActivityImages activity={activity} />
                <p className="student-activity-date">
                  Огноо: <time dateTime={activity.date}>{activity.date}</time>
                </p>
                <h3>{activity.title}</h3>
                {activity.organizerMn ? <p className="student-activity-organizer">Зохион байгуулагч: {activity.organizerMn}</p> : null}
                <p>{activity.descriptionMn}</p>
                <a className="button ghost student-activity-link" href={activity.instagramUrl} target="_blank" rel="noopener noreferrer">
                  Instagram дээр үзэх
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
