import { TypographyH4, TypographyP } from "@/shared/uiShadcn/typography";

export default function About() {
  return (
    <div
      className="px-4 my-8 flex flex-col gap-4 t-s:px-8 d-s:flex-row-reverse d-s:items-center"
      id="about"
    >
      {/* text block */}
      <div className="flex flex-col gap-2">
        <TypographyH4>
          Все Всім — якісні товари для кожного сезону та будь-якої потреби!
        </TypographyH4>
        <TypographyP className=" tracking-wide d-s:mb-4">
          Все Всім — це українська компанія з багаторічним досвідом у сфері
          торгівлі, що знаходиться в місті Луцьк. Ми спеціалізуємось на
          постачанні сезонних товарів, іграшок для дітей та освітлювальної
          техніки, задовольняючи потреби наших клієнтів як у роздріб, так і
          оптом. Завдяки більш ніж 7-річному досвіду на ринку, ми побудували
          надійні партнерські стосунки з постачальниками з Європи, що дозволяє
          нам пропонувати широкий асортимент якісної продукції за конкурентними
          цінами. Ми забезпечуємо високий рівень обслуговування, оперативну
          доставку та індивідуальний підхід до кожного клієнта, що робить нас
          надійним партнером як для малого бізнесу, так і для великих компаній.
        </TypographyP>
      </div>
      {/* <Button variant="outline" text='Читати більше про нас!'></Button> */}
      <img
        src="https://st2.depositphotos.com/3243153/7247/i/450/depositphotos_72476397-stock-photo-children-playing-with-wooden-toys.jpg"
        className="d-s:w-[400px]"
      ></img>
    </div>
  );
}
