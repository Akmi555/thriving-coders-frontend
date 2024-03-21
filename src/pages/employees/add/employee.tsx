import Head from 'next/head'
import SectionMain from '../../../components/Section/Main'
import Button from '../../../components/Button'
import SectionTitleLineWithButton from '../../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../../config'
import { mdiAccountMultipleOutline, mdiAccountPlus } from '@mdi/js'

const AddNewEmployeePage = () => {
    return (
        <>
            <Head>
                <title>{getPageTitle('Add new employee')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiAccountPlus} title="Add new employee" main>
                    <Button
                        href="/employees/overview"
                        // target="_blank"
                        icon={mdiAccountMultipleOutline}
                        label="Back to employees overview"
                        color="contrast"
                        roundedFull
                        small
                    />
                </SectionTitleLineWithButton>
            </SectionMain>
        </>

    );
}

export default AddNewEmployeePage;