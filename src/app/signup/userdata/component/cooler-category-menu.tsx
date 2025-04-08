import { Dispatch, SetStateAction } from 'react';

type CoolerCategoryMenuProps = {
  state: boolean[];
  setState?: Dispatch<SetStateAction<boolean[]>>;
  children: JSX.Element[];
  type: 'single' | 'multiple';
  enableAll?: boolean;
  className?: string;
};

export function CoolerCategoryMenu(props: CoolerCategoryMenuProps) {
  function refine(ind: number, state: boolean[]): boolean[] {
    const newState = [...props.state];
    newState[ind] = !props.state[ind];
    const numTrue = newState.filter((e) => e).length;
    const numFalse = newState.length - numTrue;

    if (props.enableAll && ind === 0 && newState[ind]) {
      const temp = new Array(newState.length).fill(false);
      temp[0] = true;
      return temp;
    }
    if (props.enableAll && numTrue <= 0) {
      const temp = new Array(newState.length).fill(false);
      temp[0] = true;
      return temp;
    }
    if (props.enableAll && ind !== 0 && newState[ind] && newState[0]) {
      newState[0] = false;
    }
    if (props.enableAll) {
      if (newState.slice(1, newState.length).filter((e) => !e).length <= 0) {
        const temp = new Array(newState.length).fill(false);
        temp[0] = true;
        return temp;
      }
    }

    switch (true) {
      case props.type === 'single' && numTrue > 1:
        for (let i = 0; i < newState.length; i++) {
          if (i === ind) newState[i] = true;
          else newState[i] = false;
        }
        break;
    }
    return newState;
  }
  return (
    <div className={`${props.className}`}>
      {props.children.map((child, ind) => (
        <div
          onClick={() => {
            if (props.setState) {
              const newState = refine(ind, props.state);
              props.setState(newState);
            }
          }}
          key={ind}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
