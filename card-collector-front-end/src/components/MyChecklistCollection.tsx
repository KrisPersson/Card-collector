import "./MyChecklistCollection.scss";
import setLists from "../../../back-end/JSONchecklists/checklists.json";
import { UserChecklist, SetLists } from "../interfaces";

const sLists = { ...setLists } as SetLists;

function MyChecklistCollection({
  userChecklistCollection,
  selectedChecklists,
  updateSelectedChecklists,
  setShowCreateChecklistModal,
}: {
  userChecklistCollection: UserChecklist[];
  selectedChecklists: string[];
  updateSelectedChecklists: (id: string) => void;
  setShowCreateChecklistModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const liItems = userChecklistCollection.map((checklist) => {
    const className = selectedChecklists.includes(checklist.id)
      ? "collection-item collection-item--selected"
      : "collection-item";

    const setInSLists = sLists[checklist.company][checklist.season][
      checklist.product
    ].sets.find(
      (set) =>
        checklist.setName === set.setName ||
        !!set.parallelSets?.find((para) => para.name === checklist.setName)
    );

    const amtCardsInSet = setInSLists ? setInSLists.checklist.length : 0;
    const isComplete =
      Number(checklist.personalChecklist.length) === Number(amtCardsInSet);

    return (
      <li
        key={checklist.id}
        id={checklist.id}
        company={checklist.company}
        season={checklist.season}
        product={checklist.product}
        setname={checklist.setName}
        onClick={(e: React.MouseEvent<HTMLLIElement>) =>
          updateSelectedChecklists(e.currentTarget.id)
        }
        className={className}
      >
        {checklist.setName}
        {isComplete && <span className="check-mark-emoji">&#9989;</span>}
      </li>
    );
  });

  liItems.sort((a: JSX.Element, b: JSX.Element) => {
    const setA = a.props.setname;
    const setB = b.props.setname;
    if (!setA || !setB) return 1;
    return setA === setB ? 0 : setA > setB ? 1 : -1;
  });

  interface UserChecklistStructure {
    [company: string]: {
      [season: string]: {
        [product: string]: string[];
      };
    };
  }

  function structureMyChecklistsBeforeRendering(liItems: JSX.Element[]) {
    let structured: UserChecklistStructure = {};

    liItems.forEach((liItem) => {
      const {
        company,
        season,
        product,
      }: { company: string; season: string; product: string } = liItem.props;
      if (!structured[company]) {
        structured = { ...structured, [company]: {} };
      }
      if (!structured[company][season]) {
        structured[company] = { ...structured[company], [season]: {} };
      }
      if (!structured[company][season][product]) {
        structured[company][season] = {
          ...structured[company][season],
          [product]: [],
        };
      }
      structured[company][season][product].push(liItem.props.id);
    });
    return structured;
  }
  function sortAndAssembleMyChecklistsBeforeRendering(
    structure: UserChecklistStructure,
    liItems: JSX.Element[]
  ) {
    const result = [];
    let counter = 0;
    const keys = Object.keys(structure);
    keys.sort((a: string, b: string) => {
      return a === b ? 0 : a < b ? 1 : -1;
    });
    let newStructure: UserChecklistStructure = {};
    keys.forEach((key) => {
      newStructure = { ...newStructure, [key]: structure[key] };
    });
    for (const companyKey in newStructure) {
      if (companyKey !== "undefined") {
        result.push(
          <h4
            className="collection__key collection__key--company"
            key={counter}
          >
            {sLists[companyKey]["name"] || companyKey}
          </h4>
        );
        counter++;

        const sortedSeasonKeys = Object.keys(newStructure[companyKey]);
        sortedSeasonKeys.sort((a: string, b: string) => {
          const numA = Number(a.slice(0, 4));
          const numB = Number(b.slice(0, 4));
          return numA - numB;
        });
        let newSeasonsStructure = {};
        sortedSeasonKeys.forEach((key) => {
          newSeasonsStructure = {
            ...newSeasonsStructure,
            [key]: newStructure[companyKey][key],
          };
        });
        newStructure[companyKey] = { ...newSeasonsStructure };

        for (const seasonKey in newStructure[companyKey]) {
          result.push(
            <h4
              className="collection__key collection__key--season"
              key={counter}
            >
              - {seasonKey}
            </h4>
          );
          counter++;

          const sortedProductKeys = Object.keys(
            newStructure[companyKey][seasonKey]
          );
          sortedProductKeys.sort((a: string, b: string) => {
            const numA = Number(
              a.split("").reduce((acc, cur) => {
                return Number(cur) ? acc + cur : acc;
              }, "")
            );
            const numB = Number(
              b.split("").reduce((acc, cur) => {
                return Number(cur) ? acc + cur : acc;
              }, "")
            );
            return numA - numB;
          });
          let newProductsStructure = {};
          sortedProductKeys.forEach((key) => {
            newProductsStructure = {
              ...newProductsStructure,
              [key]: newStructure[companyKey][seasonKey][key],
            };
          });
          newStructure[companyKey][seasonKey] = { ...newProductsStructure };

          for (const productKey in newStructure[companyKey][seasonKey]) {
            result.push(
              <h4
                className="collection__key collection__key--product"
                key={counter}
              >
                -- {sLists[companyKey][seasonKey][productKey]["name"]}
              </h4>
            );
            counter++;
            newStructure[companyKey][seasonKey][productKey].forEach(
              (checklistId) => {
                const foundLiItem = liItems.find(
                  (item) => item.props.id === checklistId
                );
                result.push(foundLiItem);
                counter++;
              }
            );
          }
        }
      }
    }
    return result;
  }

  return (
    <section className="user-checklist-collection">
      <button
        onClick={() => setShowCreateChecklistModal((prev) => !prev)}
        className="add-btn"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <h3>My Checklists</h3>
      <ul className="collection">
        {liItems.length > 0 ? (
          sortAndAssembleMyChecklistsBeforeRendering(
            structureMyChecklistsBeforeRendering(liItems),
            liItems
          )
        ) : (
          <li>No saved checklists</li>
        )}
      </ul>
    </section>
  );
}

export default MyChecklistCollection;
