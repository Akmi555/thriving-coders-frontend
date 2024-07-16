import { mdiAccountGroup, mdiAccountPlus } from "@mdi/js";
import Button from "components/Button";
import SectionMain from "components/Section/Main";
import SectionTitleLineWithButton from "components/Section/TitleLineWithButton";
import Head from "next/head"
import { getPageTitle } from "src/config"

const CustomersOverviewPage = () => {
    return (
        <>
            <Head>
                <title>{getPageTitle('Customers overview')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiAccountGroup} title="Customers overview" main>
                    <Button
                        href="/customers/add"
                        // target="_blank"
                        icon={mdiAccountPlus}
                        label="Add new customers"
                        color="contrast"
                        roundedFull
                        small
                    />
                </SectionTitleLineWithButton>
            </SectionMain>
        </>);
}

export default CustomersOverviewPage