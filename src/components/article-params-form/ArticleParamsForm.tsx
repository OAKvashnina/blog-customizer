import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, FormEvent } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { ArticleStateType,
		 OptionType,
		 fontFamilyOptions,
		 fontSizeOptions,
		 fontColors,
		 backgroundColors,
		 contentWidthArr,
		 defaultArticleState
		} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsProps = {
	currentState: ArticleStateType;
	onChangeState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({currentState, onChangeState}: ArticleParamsProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [state, setState] = useState<ArticleStateType>(currentState);
	const containerRef = useRef<HTMLDivElement>(null);
	
	useOutsideClickClose({isOpen: isOpen, onChange: setIsOpen, rootRef: containerRef});

	const addState = (key: keyof ArticleStateType, value: OptionType) => {
		setState({ ...state, [key]: value});
	}

	const submitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onChangeState(state);
	}

	const resetForm = () => {
		setState(defaultArticleState);
		onChangeState(defaultArticleState);
	}

	return (
		<>
			<ArrowButton 
				isOpen={isOpen} 
				onClick={() => setIsOpen(!isOpen)}
			/>
			<aside 
				className={clsx(styles.container, {[styles.container_open] : isOpen})}
				ref={containerRef}>
				<form className={styles.form}
					onSubmit={submitForm}
					onReset={resetForm}
				>
					<Text 
						size={31} 
						weight={800} 
						uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						onChange={(selected) => addState('fontFamilyOption', selected)}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						name={'fontSize'}
						selected={state.fontSizeOption}
						onChange={(selected) => addState('fontSizeOption', selected)}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={state.fontColor}
						onChange={(selected) => addState('fontColor', selected)}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator/>
					<Select
						selected={state.backgroundColor}
						onChange={(selected) => addState('backgroundColor', selected)}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={state.contentWidth}
						onChange={(selected) => addState('contentWidth', selected)}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer} >
						<Button title='Сбросить' htmlType='reset' type='clear'/>
						<Button title='Применить' htmlType='submit' type='apply'/>
					</div>
				</form>
			</aside>
		</>
	);
};
