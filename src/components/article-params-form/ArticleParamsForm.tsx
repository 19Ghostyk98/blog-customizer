import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const [formState, setFormState] = useState<ArticleStateType>(currentState);

	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				isOpen &&
				formRef.current &&
				!formRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const handleFontFamilyChange = (option: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: option });
	};

	const handleFontSizeChange = (option: OptionType) => {
		setFormState({ ...formState, fontSizeOption: option });
	};

	const handleFontColorChange = (option: OptionType) => {
		setFormState({ ...formState, fontColor: option });
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setFormState({ ...formState, backgroundColor: option });
	};

	const handleContentWidthChange = (option: OptionType) => {
		setFormState({ ...formState, contentWidth: option });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleResetForm = () => {
		onReset();
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					{}
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>
					<Separator />

					{}
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>
					<Separator />

					{}
					<RadioGroup
						name='fontColor'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>
					<Separator />

					{}
					<RadioGroup
						name='backgroundColor'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>
					<Separator />

					{}
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetForm}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
