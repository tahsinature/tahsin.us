import images from 'src/assets/images';

const tools = [
  {
    _id: '1',
    image: images.logogs.grpc,
    title: 'gRPC',
    display: true,
    description: 'I like gRPC transport mechanism for request/response as non-persistent streaming protocol.',
    url: 'https://grpc.io/',
  },
  {
    _id: '23',
    image: images.logogs.graphQL,
    title: 'GraphQL',
    display: true,
    description: 'GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.',
    url: 'https://graphql.org/',
  },
  {
    _id: '3',
    image: images.logogs.socketIO,
    title: 'Socket.IO',
    display: true,
    description: 'I am using Socket.IO for bi-directional communication for quite a long now.',
    url: 'https://socket.io/',
  },
  {
    _id: '2',
    image: images.logogs.googlePubSub,
    title: 'Google Cloud Pub/Sub',
    display: true,
    description: "GC Pub/Sub became my favt tool for event driven architecture and a good alternative to Kafka as it is backed by Google and because of it's less complexity",
    url: 'https://cloud.google.com/pubsub',
  },
  {
    _id: '4',
    image: images.logogs.firebase,
    title: 'FCM',
    description: "Using Firebase Cloud Messaging (FCM) since 2019, as it's powered by Google, feels pretty consistant and reliable.",
  },
  {
    _id: '5',
    image: images.logogs.docker,
    title: 'Docker',
    display: true,
    description: "Everyday's tool. In fact if I create a new repo now, I put it on docker first.",
    url: 'https://www.docker.com/',
  },
  {
    _id: '6',
    image: images.logogs.jest,
    title: 'Jest',
    display: true,
    description: 'Previously I was using Jasmine for testing. Now using Jest since 2019.',
    url: 'https://jestjs.io/',
  },
  {
    _id: '7',
    image: images.logogs.jasmine,
    title: 'Jasmine',
    description: 'Before I started to use Jest, I was using Jesmine continuously as a testing framework for JavaScript',
  },
  {
    _id: '8',
    image: images.logogs.redux,
    title: 'Redux',
    description: 'If I use React or React Native apps, redux will take place there for sure.',
  },
  {
    _id: '9',
    image: images.logogs.reduxSaga,
    title: 'Redux Saga',
    description: 'I use it to handle side effects of react or, react-native apps.',
  },
  {
    _id: '10',
    image: images.logogs.sass,
    title: 'Sass',
    description: 'Whenever I say I am writting CSS, it means I am writting Sass. I mean literally',
  },
  {
    _id: '11',
    image: images.logogs.gulp,
    title: 'Gulp',
    description: "I use gulp mostly when I don't use a framework. Great tool as a task-runner",
  },
  {
    _id: '12',
    image: images.logogs.git,
    title: 'Git',
    description: 'Of course you can say, "Every minute I use Git on GitHub and GitLab". Literally.',
  },
  {
    _id: '13',
    image: images.logogs.opsManager,
    title: 'ORM / ODM',
    description: 'I use Mongoose, Sequelize & TypeORM to deal with the databases I work on day-to-day.',
  },
  {
    _id: '14',
    image: images.logogs.redis,
    title: 'Redis',
    display: true,
    description: "I've been using Redis for caching & scheduling. I love it for those purposes.",
    url: 'https://redis.io/',
  },
  {
    _id: '15',
    image: images.logogs.database,
    title: 'Databases',
    description: "So far I've worked with Postgres, MongoDB & MySQL.",
  },
  {
    _id: '16',
    image: images.logogs.firebase,
    title: 'Firebase',
    description: "I love this platform. I feel so comfortable and confident as it's backed by Google",
  },
  {
    _id: '17',
    image: images.logogs.sonarQube,
    title: 'SonarQube',
    display: true,
    description: 'I use Sonar to inspect my code quality, detect bugs, code smells and security vulnerabilities. Really helps when I work in a team.',
    url: 'https://www.sonarqube.org/',
  },
  {
    _id: '18',
    image: images.logogs.hashicorpVault,
    title: 'HashiCorp Vault',
    display: true,
    description: "It's a single source of truth to manage credentials. I use it for storing application API keys, passwords, certificates and other sensitive data.",
    url: 'https://www.vaultproject.io/',
  },
  {
    _id: '19',
    image: images.logogs.doppler,
    title: 'Doppler',
    display: true,
    description: 'Doppler is the easiest way to securely manage all your environment variables in one encrypted place. No more sharing secrets over Slack or copying .env.',
    url: 'https://www.doppler.com/',
  },
  {
    _id: '20',
    image: images.logogs.selenium,
    title: 'Selenium',
    description: 'I use it to automate browser related stuffs as well as to write e2e test.',
    url: 'https://www.selenium.dev/',
  },
  {
    _id: '21',
    image: images.logogs.gitHubActions,
    title: 'GitHub Actions',
    display: true,
    description: 'GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline.',
    url: 'https://github.com/features/actions',
  },
  {
    _id: '22',
    image: images.logogs.digitalOcean,
    title: 'DigitalOcean',
    display: true,
    description: 'DigitalOcean is a cloud computing vendor that offers an Infrastructure as a Service (IaaS) platform for software developers.',
    url: 'https://www.digitalocean.com/',
  },
];

export default tools;
