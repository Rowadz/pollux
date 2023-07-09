import { Alert } from 'rsuite'
// we should use dynamic loading (import(...).then(...))
import { faker } from '@faker-js/faker'
import { faker as arabicFaker } from '@faker-js/faker/locale/ar'
import { faker as englishFaker } from '@faker-js/faker/locale/en'
import { faker as germanFaker } from '@faker-js/faker/locale/de'
import { faker as czechFaker } from '@faker-js/faker/locale/cz'
import { faker as spanishFaker } from '@faker-js/faker/locale/es'
import { faker as frenchFaker } from '@faker-js/faker/locale/fr'
import { faker as koreanFaker } from '@faker-js/faker/locale/ko'
import { faker as SwedishFaker } from '@faker-js/faker/locale/sv'
import { faker as ChineseFaker } from '@faker-js/faker/locale/sv'

import { saveAs } from 'file-saver'
import RandExp from 'randexp'
import JSZip from 'jszip'
import type {
  FakerProp,
  ReduxState,
  Relation,
  RelationProps,
} from 'components/shared'
import npmCongif from '../../../../zipFileContent/package.json'
import apiReadme from '../../../../zipFileContent/readme.md'
import npmCongifGraphql from '../../../../graphqlZipContent/package.json'
import graphqlReadme from '../../../../graphqlZipContent/readme.md'

import { spawnWebWorker } from '../../webWorker'
import store from 'redux/store'

// @ts-expect-error
window.faker = faker

export const generate = (
  props: FakerProp[],
  name: string,
  amount: number,
  relations: Relation[],
  relationsProps: RelationProps,
  justReturn: boolean,
  modelId: string,
  onlyJSON = false,
  overrideRelationsCount?: number
) => {
  if (!props) {
    Alert.warning(`plz add some properties to this model (${name})`)
    return
  }
  const atLeastOneWithoutFunc = props
    .filter(({ func }) => !func)
    .map(({ propName }) => propName)
  const len = atLeastOneWithoutFunc.length
  if (len > 0) {
    Alert.warning(
      `There is ${len} ${
        len === 1 ? 'property' : 'properties'
      } without function ${atLeastOneWithoutFunc.join(' || ')}`
    )
    return
  }

  if ((!window.Worker || amount < 10000 || relations) && !onlyJSON) {
    if (amount > 10000) {
      Alert.info(
        'This browser do not support web workers, generating data on the main thread 🧵'
      )
    }
    const res = generateFakeData(props, amount)
    if (relations) {
      const resWithRelations = res.map((obj) => ({
        ...obj,
        ...relations.reduce(
          (prev, { name, id }: Relation) => ({
            ...prev,
            [name]: generateFakeData(
              relationsProps[id],
              overrideRelationsCount || 10
            ),
          }),
          {}
        ),
      }))
      if (justReturn) {
        return resWithRelations
      }
      downloadData(resWithRelations, name)
    } else {
      if (justReturn) {
        return res
      }
      downloadData(res, name)
    }
  } else {
    return spawnWebWorker({
      props,
      amount,
      modelId,
      relations,
      relationsProps,
      locale: store.getState().locale,
    })
      .then((result) => {
        const data = result.flat()
        // see https://stackoverflow.com/questions/29175877/json-stringify-throws-rangeerror-invalid-string-length-for-huge-objects
        // stringify-ing the whole array might cause (RangeError: Invalid string length) error
        // which means "Out Of Memory"
        const outJSON = '[' + data.map((el) => toJSONPritty(el)).join(',') + ']'

        if (justReturn) {
          return outJSON
        }
        saveAs(new Blob([outJSON], { type: 'application/json' }), name)
        Alert.success(`Downloaded ${name}.json 👍`)
      })
      .catch((error) => {
        console.group('Error generating data')
        console.log('the error object')
        console.error(error)
        console.log('you can open an issue with this error in the link below')
        console.log('https://github.com/Rowadz/pollux')
        console.groupEnd()
        Alert.error(
          'Feels bad, we faced an error ¯_(ツ)_/¯. Save your models before exiting the page.'
        )
      })
  }
}

const generateFakeData = (props: FakerProp[], amount: number) =>
  Array.from({ length: amount }).map(() => {
    return props.reduce(
      (prev, { propName, groupName, func, regex: regexStr }) => {
        if (
          groupName === 'image' ||
          (groupName === 'random' && func === 'image')
        ) {
          return {
            ...prev,
            [propName]: faker.helpers.arrayElement([
              'http://placekitten.com/500/600',
              'http://placekitten.com/1200/600',
              'http://placekitten.com/1200/1200',
            ]),
          }
        }
        const key = func === 'fullName' ? 'findName' : func
        if (key === 'regex') {
          const randexp = new RandExp(regexStr as string)
          return {
            ...prev,
            [propName]: randexp.gen(),
          }
        }

        const locale = store.getState().locale

        const arabic = `
          لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي.
          و سأعرض مثال حي لهذا، من منا لم يتحمل جهد بدني شاق إلا من أجل الحصول على ميزة أو فائدة؟ ولكن من لديه الحق أن ينتقد شخص ما أراد أن يشعر بالسعادة التي لا تشوبها عواقب أليمة أو آخر أراد أن يتجنب الألم الذي ربما تنجم عنه بعض المتعة ؟ 
          علي الجانب الآخر نشجب ونستنكر هؤلاء الرجال المفتونون بنشوة اللحظة الهائمون في رغباتهم فلا يدركون ما يعقبها من الألم والأسي المحتم، واللوم كذلك يشمل هؤلاء الذين أخفقوا في واجباتهم نتيجة لضعف إرادتهم فيتساوي مع هؤلاء الذين يتجنبون وينأون عن تحمل الكدح والألم .
        `

        const german = `
            meliore persecuti Bezirksschornsteinfegermeister mel. Te oratio utamur vix. 
            Grimms Märchen eloquentiam eu per. Principes complectitur Schneewittchen no. 
            His illud moderatius ut, Milchreis pro omnis minim epicurei, natum Lebensabschnit
            tsgefährte mel ei. Sea purto singulis danke amet, consectetur adipiscing elit, sed Berlin 
            eiusmod tempor incididunt ut labore bitte dolore magna aliqua. Ut enim Glühwein minim veniam, 
            quis nostrud exercitation Polizei laboris nisi ut aliquip ex Mercedes Benz commodo consequat. 
            Duis aute irure Riesling in reprehenderit in voluptate velit Grimms Märchen cillum dolore eu 
            fugiat nulla Currywurst Excepteur sint occaecat cupidatat non Schweinsteiger sunt in culpa 
            qui officia zu spät mollit anim id est laborum
        `

        const english = `
            Generating random paragraphs can be an excellent way for writers to get their creative flow going at the 
            beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. 
            This forces the writer to use creativity to complete one of three common writing challenges. The writer can 
            use the paragraph as the first one of a short story and build upon it. A second option is to use the random 
            paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending 
            paragraph in a short story. No matter which of these challenges is 
            undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.
        `

        const czech = `
            Stařík se na útěk, šlapaje popopo po nějakých ži-živých tělech, jež se protínají a prostupují v 
            břitkých úhlech jako krystalografické modely; a proti nim vyjela dvě prudká světla, pár hlasů zavylo,
            auto sebou smýkalo stranou a hází rukou, jako by byl čas… už by byl učinil, kdyby byl toho večera nepřišel; 
            ale přihnal se právě proto, že mu pak nechám všechno, rozuměl jste? Prosím. 
            Tak už jděte, jděte rychle, u všech – Čekal v zimničné netrpělivosti. Není… není to pro mne, je to hlas.
        `

        const spanish = `
            Pero debo explicarte que todas estas ideas erróneas sobre denunciar el placer y glorificar el dolor ya han surgido, y te mostraré los detalles para descubrir la verdad y la base de esa felicidad humana, para sentirla de una manera más racional y lógica, y esto los expone a enfrentar las terribles circunstancias, y repito que nadie desea el amor, el logro y disfruta el dolor El dolor es dolor, pero como resultado de las circunstancias, la felicidad puede residir en lo que soportamos de trabajo y dolor.
            Y daré un vívido ejemplo de esto, ¿quién de nosotros no ha soportado un duro esfuerzo físico excepto para obtener una ventaja o beneficio? Pero, ¿quién tiene derecho a criticar a alguien que quería sentir felicidad sin consecuencias dolorosas, oa alguien que quería evitar el dolor que podría resultar en algún placer?
            Por otro lado, deploramos y denunciamos a aquellos hombres que se dejan fascinar por el éxtasis del momento, que vagan en sus deseos y no se dan cuenta del dolor y la tristeza inevitables que les siguen. un resultado de la debilidad de su voluntad, igual a aquellos que evitan y se niegan a soportar el trabajo y el dolor.
        `

        const french = `
            Mais je dois vous expliquer que toutes ces idées fausses sur la dénonciation du plaisir et la glorification de la douleur ont déjà surgi, et je vais vous montrer les détails pour découvrir la vérité et la base de ce bonheur humain. cela les expose à faire face à des circonstances désastreuses, et je répète que personne ne désire l'amour, l'accomplissement et n'apprécie la douleur. La douleur est la douleur, mais en raison des circonstances, le bonheur peut résider dans ce que nous endurons de labeur et de chagrin.
            Et je donnerai un exemple frappant de cela, qui parmi nous n'a pas enduré un dur effort physique, sauf pour obtenir un avantage ou un bénéfice ? Mais qui a le droit de critiquer quelqu'un qui a voulu ressentir le bonheur sans conséquences douloureuses, ou quelqu'un qui a voulu éviter la douleur qui pourrait résulter en un certain plaisir ?
            D'autre part, nous déplorons et dénonçons ces hommes fascinés par l'extase du moment, qui errent dans leurs désirs et ne se rendent pas compte de la douleur et du chagrin inévitables qui les suivent. un résultat de la faiblesse de leur volonté, égal à ceux qui évitent et refusent de supporter le labeur et la douleur.
        `

        const korean = `
          그러나 쾌락을 비난하고 고통을 미화하는 것에 대한 이러한 모든 오해가 이미 발생했다는 점을 설명해야 하며, 그 인간의 행복의 진실과 근거를 발견하기 위해 세부 사항을 보여드리겠습니다. 이것은 그들을 끔찍한 상황에 직면하게 하고, 사랑, 성취, 고통을 원하는 사람은 아무도 없다는 것을 반복합니다. 고통은 고통이지만 상황의 결과로 우리가 수고와 슬픔을 견디는 데 행복이 있을 수 있습니다.
          그리고 나는 이것에 대한 생생한 예를 들어 드리겠습니다. 우리 중 어떤 사람이 이익이나 이익을 위해서 외에는 힘든 육체 노동을 견디지 못했습니까? 그러나 고통스러운 결과 없이 행복을 느끼고 싶어하는 사람이나 약간의 즐거움을 가져올 수 있는 고통을 피하고 싶어하는 사람을 누가 비난할 권리가 있습니까?
          한편, 순간의 황홀함에 매료되어 욕망에 방황하며, 그에 따른 피할 수 없는 고통과 슬픔을 깨닫지 못하는 사람들을 한탄하고 질책합니다. 수고와 고통을 피하고 견디기를 거부하는 사람들과 마찬가지로 의지가 약하기 때문입니다.
        `

        const swedish = `
            Men jag måste förklara för dig att alla dessa missuppfattningar om att fördöma njutning och förhärliga smärta redan har uppstått, och jag kommer att visa dig detaljerna för att upptäcka sanningen och grunden för den mänskliga lyckan. För att känna den på ett mer rationellt och logiskt sätt, och detta utsätter dem för att möta de hemska omständigheterna, och jag upprepar att ingen önskar kärlek, uppnående och åtnjuter smärta. Smärta är smärta, men som ett resultat av omständigheterna kan lyckan ligga i det vi uthärdar av slit och sorg.
            Och jag ska ge ett levande exempel på detta, vem av oss har inte utstått hård fysisk ansträngning förutom för att få en fördel eller fördel? Men vem har rätt att kritisera någon som ville känna lycka utan smärtsamma konsekvenser, eller någon som ville undvika smärtan som kan resultera i något nöje?
            Å andra sidan beklagar och fördömer vi de män som fascineras av ögonblickets extas, som vandrar i sina begär och inte inser den oundvikliga smärta och sorg som följer dem.Klandern omfattar även de som misslyckats med sina plikter som ett resultat av deras viljas svaghet, lika med dem som undviker och vägrar att bära slit och smärta.
        `

        const chinese = `
          但我必须向你解释，所有这些关于谴责快乐和颂扬痛苦的误解已经出现，我将向你展示细节，以发现人类幸福的真相和基础。以更理性和合乎逻辑的方式感受它，以及这使他们面临着可怕的境遇，我再说一遍，没有人渴望爱、成就和享受痛苦。痛苦就是痛苦，但由于境遇，幸福可能在于我们所忍受的辛劳和悲伤。
          我再举一个生动的例子，我们当中有谁没有为了获得优势或利益而忍受过艰苦的体力劳动？但是，谁有权批评一个想要在没有痛苦后果的情况下获得幸福的人，或者一个想要避免可能带来一些快乐的痛苦的人呢？
          另一方面，我们谴责和谴责那些沉迷于当下的狂喜，在欲望中徘徊而没有意识到随之而来的不可避免的痛苦和悲伤的人。意志薄弱的结果，等于回避和拒绝承受劳苦和痛苦的人。
        `

        const strToUse = {
          ar: arabic,
          de: german,
          en: english,
          cz: czech,
          es: spanish,
          fr: french,
          ko: korean,
          zh_CN: chinese,
          sv: swedish,
        }

        const fakerToUse = {
          ar: arabicFaker,
          de: germanFaker,
          en: englishFaker,
          cz: czechFaker,
          es: spanishFaker,
          fr: frenchFaker,
          ko: koreanFaker,
          zh_CN: ChineseFaker,
          sv: SwedishFaker,
        }

        // this check to make sure we are backward compatable with the old saved models
        const keyProxy = key === 'number' ? 'numeric' : key
        return {
          ...prev,
          // this check to make sure we are backward compatable with the old saved models
          [propName]:
            groupName === 'random' && key === 'uuid'
              ? // @ts-ignore
                faker.datatype.uuid()
              : keyProxy === 'paragraph' || keyProxy === 'paragraphs'
              ? // @ts-ignore
                strToUse[locale].substring(
                  0,
                  keyProxy === 'paragraphs' ? Number.POSITIVE_INFINITY : 100
                )
              : // @ts-ignore
                fakerToUse[locale][groupName][keyProxy](),
        }
      },
      {}
    )
  })

const downloadData = (data: unknown[], name: string): void => {
  saveAs(new Blob([toJSONPritty(data)], { type: 'application/json' }), name)
  Alert.success(`Downloaded ${name}.json 👍`)
}

const toJSONPritty = (data: any): string => JSON.stringify(data, null, 2)

export const relationsPropsGetter = (
  state: Pick<ReduxState, 'prop' | 'relations'>,
  modelId: string
) =>
  (state.relations[modelId] || []).reduce(
    (prev, id) => ({ ...prev, [id]: state.prop[id] }),
    {}
  )

export const relationsGetter = (
  state: Pick<ReduxState, 'models' | 'relations'>,
  modelId: string
): Relation[] =>
  (state.relations[modelId] || []).map((uuid) =>
    state.models.find(({ id }) => uuid === id)
  ) as Relation[]

export const generateAPI = async (
  name: string,
  props: FakerProp[] | null,
  amount: number | null = 10,
  relations: Relation[] | null,
  relationsProps: RelationProps | null,
  data: unknown[] | null | unknown,
  auth?: boolean,
  modelId?: string
) => {
  try {
    if (!props && !data) {
      Alert.warning(`plz add some properties to this model (${name})`)
      return
    }
    const zip = new JSZip()
    zip.file('package.json', toJSONPritty(npmCongif(auth)))
    zip.file(
      'db.json',
      toJSONPritty(
        data
          ? data
          : {
              [name]: generate(
                props as FakerProp[],
                name,
                amount as number,
                relations as Relation[],
                relationsProps as RelationProps,
                true,
                modelId as string
              ),
            }
      )
    )
    zip.file('README.md', apiReadme(name))
    zip.file('routes.json', toJSONPritty({ [name]: 660 }))
    const zipContent = await zip.generateAsync({ type: 'blob' })
    saveAs(zipContent, 'pollux-api.zip')
    Alert.success(`Downloaded pollux-api.zip 👍`)
  } catch (error) {
    Alert.error(
      'Something went wrong while generating your API, please checkout the console'
    )
    console.group('Error generating the API')
    console.log('the error object')
    console.error(error)
    console.log('you can open an issue with this error in the link below')
    console.log('https://github.com/Rowadz/pollux')
    console.groupEnd()
  }
}

export const generateGraphqlAPI = async (
  name: string,
  props: FakerProp[],
  amount: number,
  relations: Relation[],
  relationsProps: RelationProps,
  modelId: string
) => {
  try {
    if (!props) {
      Alert.warning(`plz add some properties to this model (${name})`)
      return
    }
    const zip = new JSZip()
    zip.file('package.json', toJSONPritty(npmCongifGraphql()))
    const jsonStr = await generate(
      props,
      name,
      amount,
      relations,
      relationsProps,
      true,
      modelId,
      true
    )

    zip.file('db.json', '{"' + name + '":' + jsonStr + '}')
    zip.file('README.md', graphqlReadme(name))

    const zipContent = await zip.generateAsync({ type: 'blob' })
    saveAs(zipContent, 'pollux-graphql.zip')

    Alert.success(`Downloaded pollux-graphql.zip 👍`)
  } catch (error) {
    Alert.error(
      'Something went wrong while generating your API, please checkout the console'
    )
    console.group('Error generating the GraphQL API')
    console.log('the error object')
    console.error(error)
    console.log('you can open an issue with this error in the link below')
    console.log('https://github.com/Rowadz/pollux')
    console.groupEnd()
  }
}
