import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
	defaultState: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApply,
	defaultState,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(defaultState);
	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				isSidebarOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isSidebarOpen]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleChange =
		<K extends keyof ArticleStateType>(field: K) =>
		(value: ArticleStateType[K]) => {
			setFormState((prev) => ({ ...prev, [field]: value }));
		};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsSidebarOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultState);
		onApply(defaultState);
		setIsSidebarOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					{}
					<div className={styles.spacingTitleToFont}>
						<Text size={31} weight={800} uppercase align='left'>
							Задайте параметры
						</Text>
					</div>

					{}
					<div className={styles.spacingFontToSize}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleChange('fontFamilyOption')}
							title='Шрифт'
						/>
					</div>
					<Separator />

					{}
					<div className={styles.spacingSizeToFontColor}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleChange('fontSizeOption')}
							title='Размер шрифта'
						/>
					</div>
					<Separator />

					{}
					<div className={styles.spacingFontColorToBackground}>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleChange('fontColor')}
							title='Цвет шрифта'
						/>
					</div>
					<Separator />

					{}
					<div className={styles.spacingBackgroundToWidth}>
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleChange('backgroundColor')}
							title='Цвет фона'
						/>
					</div>
					<Separator />

					{}
					<div className={styles.spacingWidthToButtons}>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleChange('contentWidth')}
							title='Ширина контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
