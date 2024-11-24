import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Home": "Home",
      "Services": "Services",
      "The Team": "The Team",
      "About Us": "About Us",
      "Send Message": "Send Message",
      "Your Email": "Your Email",
      "Your Message": "Your Message",
      "Our Clients": "Our Clients" ,
      "Our Services" : "Our Services",
      "OUR JOURNEY STARTED IN 2008" : "OUR JOURNEY STARTED IN 2008",
      "Contact Us" : "Contact Us" ,
      "Our projects": "Our projects" ,
      "We'd love to hear from you!" : "We'd love to hear from you!" ,
      "Find Us on the Map" : "Find Us on the Map" ,
      "Our company started to get very well known in the region and it is competing with other companies. We started doing fixed installation systems besides live events, like audio, lighting systems, and LED screens. The company is growing fast and exponentially. Because of our professionalism and OCD at our work, we built up a very close relationship with our clients." : "Our company started to get very well known in the region and it is competing with other companies. We started doing fixed installation systems besides live events, like audio, lighting systems, and LED screens. The company is growing fast and exponentially. Because of our professionalism and OCD at our work, we built up a very close relationship with our clients.",
      "We currently have two warehouses in Dubai and Sharjah, in addition to office spaces in Dubai and Abu Dhabi in TwoFour54. We have added extra services in order to serve our clients with full force and cover all their needs ,from live, studio, and post production." : "We currently have two warehouses in Dubai and Sharjah, in addition to office spaces in Dubai and Abu Dhabi in TwoFour54. We have added extra services in order to serve our clients with full force and cover all their needs ,from live, studio, and post production."
    }
  },
  ar: {
    translation: {
      "Home": "الصفحة الرئيسية",
      "Services": "الخدمات",
      "The Team": "الفريق",
      "About Us": "معلومات عنا",
      "Contact Us": "اتصل بنا",
      "Send Message": "إرسال الرسالة",
      "Your Email": "بريدك الإلكتروني",
      "Your Message": "رسالتك",
      
      "Our Clients": "عملائنا",
      "Our Services": "خدماتنا",
      "OUR JOURNEY STARTED IN 2008" : "بدأت رحلتنا في عام 2008",
      "We'd love to hear from you!" : "نحن نحب أن نسمع منك!" ,
      "Find Us on the Map" : "ابحث عنا على الخريطة" ,
      "Our projects" : "مشاريعنا" ,
      "We currently have two warehouses in Dubai and Sharjah, in addition to office spaces in Dubai and Abu Dhabi in TwoFour54. We have added extra services in order to serve our clients with full force and cover all their needs ,from live, studio, and post production." : "لدينا حاليا مستودعين في دبي والشارقة، بالإضافة إلى مساحات مكتبية في دبي وأبو ظبي . لقد أضفنا خدمات إضافية من أجل خدمة عملائنا بكل قوة وتغطية جميع احتياجاتهم, من البث المباشر والاستوديو ومرحلة ما بعد الإنتاج " ,
      "Our company started to get very well known in the region and it is competing with other companies. We started doing fixed installation systems besides live events, like audio, lighting systems, and LED screens. The company is growing fast and exponentially. Because of our professionalism and OCD at our work, we built up a very close relationship with our clients." : "بدأت شركتنا تحظى بشهرة كبيرة في المنطقة وأصبحت تتنافس مع شركات أخرى. بدأنا في تنفيذ أنظمة التثبيت الثابتة إلى جانب الأحداث الحية، مثل أنظمة الصوت والإضاءة وشاشات الليد . تنمو الشركة بسرعة وبشكل كبير. بسبب احترافيتنا ووسواسنا في عملنا، قمنا ببناء علاقة وثيقة للغاية مع عملائنا"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
