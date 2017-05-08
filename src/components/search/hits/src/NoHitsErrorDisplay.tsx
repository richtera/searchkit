import * as React from "react";
import {
	FastClick
} from "../../../../core"

export interface NoHitsErrorDisplayProps {
	errorLabel:string
	tryAgainLabel:string
  resetSearchFn: Function
  translate: Function
	bemBlocks: {container:Function}
	error: any
}

export class NoHitsErrorDisplay extends React.Component<NoHitsErrorDisplayProps, any> {

  render() {
		const {errorLabel, bemBlocks, resetSearchFn, tryAgainLabel} = this.props

    return (
			<div data-qa="no-hits" className={bemBlocks.container().toString()}>
				<div className={bemBlocks.container("info").toString()}>
					{errorLabel}
				</div>
				<div className={bemBlocks.container("steps").toString()}>
					<FastClick handler={resetSearchFn}>
						<div className={bemBlocks.container("step-action").toString()}>
							{tryAgainLabel}
						</div>
					</FastClick>
				</div>
			</div>
		)

	}


}
